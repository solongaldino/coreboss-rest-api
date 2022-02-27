import { BASE_URL_FRONT_END } from '../configs/GlobalConfig';
import { AuthDto, ConfirmationRegisterDto, ConfirmPasswordRecoveryDto, LogoutDto, RegisterDto } from '../dtos/services/UserServiceDto';
import { TokenMailStatus } from '../enums/TokenMailStatus';
import { TokenMailType } from '../enums/TokenMailType';
import { UserStatus } from '../enums/UserStatus';
import { UserType } from '../enums/UserType';
import CryptoPassword from '../utils/CryptoPassword';
import Token from '../utils/Token';
import UID from '../utils/UID';
import AuthJwtService from './AuthJwtService';
import prisma from './PrismaService';

class UserService{

    async getById(val: string){        
        return await prisma.user.findUnique({
            where:{
                id: val,
            }
        });
    }

    async getByEmail(val: string){        
        return await prisma.user.findUnique({
            where:{
                email: val,
            }
        });
    }

    async updatePassworById(id: string, password: string){

        const user = await this.getById(id);
        if(!!!user) throw new Error("Usuário não encontrado");

        const isValidPassword = CryptoPassword.comparePassword(password, user.password);
        if(!isValidPassword) throw new Error("Senha incorreta");
        
        const passwordEc = CryptoPassword.generationHash(password);

        return await prisma.user.update({
            where:{
                id: id,
            },
            data:{
                password: passwordEc,
            }
        });
    }

    async register(obj: RegisterDto){

        const user = await this.getByEmail(obj.email);

        if(!!user) throw new Error("E-mail encontra-se em uso");
        
        const passwordEc = CryptoPassword.generationHash(obj.password);

        const token = Token.create();

        const tokenMail = await prisma.tokenMail.create({
            data:{
                id: UID.createDefault(),
                email: obj.email,
                token: token.hash,
                type: TokenMailType.REGISTER_USER,
                status: TokenMailStatus.OPEN,
                details: JSON.stringify({ password: passwordEc }),
                token_expiration: token.expiration,
                created_at: new Date()
            }
        });

        if(!tokenMail) throw new Error("Error ao salvar informações");

        const url = BASE_URL_FRONT_END+"/confirmationRegister?token="+tokenMail.token;
        
        // Envia e-mail para confirmação do cadastro
        
    }

    async confirmationRegister(obj: ConfirmationRegisterDto){      
        
        const tokenMail = await prisma.tokenMail.findUnique({
            where:{
                token: obj.token,
            }
        });

        if(!tokenMail) throw new Error("Token não existe");

        if(tokenMail.status == TokenMailStatus.EXPIRED) throw new Error("Token expirado");

        if(Token.isExpired(tokenMail.token_expiration)){

            await prisma.tokenMail.update({
                where:{
                    id: tokenMail.id
                },
                data:{
                    status: TokenMailStatus.EXPIRED
                }
            });

            throw new Error("Token expirado");
        }

        const userType = (expression: TokenMailType) => {
            switch ( expression ) {
                case TokenMailType.REGISTER_USER:
                    return UserType.CUSTOMER;

                case TokenMailType.REGISTER_ADMIN:
                    return UserType.ADMIN;

                default: 
                    throw new Error("Type not found");
             }
        }

        if(!tokenMail.details) throw new Error("Password not found");

        const createUser = prisma.user.create({
            data:{
                id: UID.createDefault(),
                email: tokenMail.email,
                password: JSON.parse(tokenMail.details).password,
                status: UserStatus.ACTIVE,
                type: userType(tokenMail.type as TokenMailType),
                attempt_login: 0,
                created_at: new Date()
            }
        });

        const updateTokenMail = prisma.tokenMail.update({
            where:{
                id: tokenMail.id
            },
            data:{
                status: TokenMailStatus.FINISHED
            }
        });
        
        const transaction = await prisma.$transaction([createUser, updateTokenMail]);

        if(!transaction) throw new Error("Transaction fail");

        return transaction;
    }

    async auth(obj: AuthDto){

        const user = await this.getByEmail(obj.email);
        if(!!!user) throw new Error("E-mail não encontrado");
        if(user.status == UserStatus.BLOCKED_ATTEMPT_LOGIN)
            throw new Error("Usuário bloqueado devido as varias tentativas de login com senha incorreta, verifique sua caixa de e-mail.");

        const isValidPassword = CryptoPassword.comparePassword(obj.password, user.password);
        
        if(!isValidPassword){

            const attemptLogin = user.attempt_login + 1;

            const maxAttempt = 5;

            if(attemptLogin >= maxAttempt){

                const blockUser = prisma.user.update({
                    where:{
                        id: user.id,
                    },
                    data:{
                        attempt_login: attemptLogin,
                        status: UserStatus.BLOCKED_ATTEMPT_LOGIN
                    }
                });

                const token = Token.create(999999999);

                const tokenMail = prisma.tokenMail.create({
                    data:{
                        id: UID.createDefault(),
                        email: user.email,
                        token: token.hash,
                        type: TokenMailType.BLOCKED_USER_ATTEMPT_LOGIN,
                        status: TokenMailStatus.OPEN,
                        token_expiration: token.expiration,
                        created_at: new Date()
                    }
                });
                
                const transaction = await prisma.$transaction([blockUser, tokenMail]);
                if(!transaction) throw new Error("Error ao salvar informações");
        
                const url = BASE_URL_FRONT_END+"/confirmationRegister?token="+token.hash;

                //Enviar e-mail

                throw new Error("Usuário bloqueado, mais de "+maxAttempt+" tentativas de acessos com senha incorreta, verifique sua caixa de e-mail");
            }

            const updateAttemptLoginUser = await prisma.user.update({
                where:{
                    id: user.id,
                },
                data:{
                    attempt_login: attemptLogin,
                }
            });

            if(!updateAttemptLoginUser) throw new Error("Error ao salvar informações");

            throw new Error("Senha incorreta, restam apenas "+ (maxAttempt - attemptLogin) +" tentativas para sua contas ser bloqueada.");

        }

        const xAccessToken = AuthJwtService.login({
            id: user.id
        });

        const loginStatement = prisma.loginStatement.create({
            data:{
                id: UID.createDefault(),
                user: user.id,
                created_at: new Date()
            }
        });

        const updateAttemptLoginUser = prisma.user.update({
            where:{
                id: user.id,
            },
            data:{
                attempt_login: 0,
            }
        });

        const transaction = await prisma.$transaction([updateAttemptLoginUser, loginStatement]);

        if(!transaction) throw new Error("Transaction fail");

        return xAccessToken;
    }

    async logout(obj: LogoutDto){

        const userId = "";
        
        const user = await this.getById(userId);
        if(!!!user) throw new Error("User not found");

        const response = await prisma.jwtBlackList.create({
            data:{
                id: UID.createDefault(),
                user: user.id,
                token: obj.token,
                created_at: new Date()
            }
        });

        if(!response) throw new Error("Logout fail");
    }

    async isAuthenticated(token: string){
        return AuthJwtService.isAuthenticated(token);
    }

    async passwordRecoveryRequest(email: string){
        
        const user = await this.getByEmail(email);
        if(!!!user) throw new Error("E-mail não encontrado");

        const token = Token.create();
        
        const tokenMail = await prisma.tokenMail.create({
            data:{
                id: UID.createDefault(),
                email: email,
                token: token.hash,
                type: TokenMailType.PASSWORD_RECOVERY_REQUEST,
                status: TokenMailStatus.OPEN,
                token_expiration: token.expiration,
                created_at: new Date()
            }
        });

        if(!tokenMail) throw new Error("Error ao salvar informações");

        const url = BASE_URL_FRONT_END+"/update-password?token="+tokenMail.token;

        // Envia e-mail com instruções e link para formulario de nova senha        
    }

    async confirmPasswordRecovery(obj: ConfirmPasswordRecoveryDto){

        const tokenMail = await prisma.tokenMail.findUnique({
            where:{
                token: obj.token,
            }
        });

        if(!tokenMail) throw new Error("Token não existe");

        if(tokenMail.status == TokenMailStatus.EXPIRED) throw new Error("Token expirado");

        if(Token.isExpired(tokenMail.token_expiration)){

            await prisma.tokenMail.update({
                where:{
                    id: tokenMail.id
                },
                data:{
                    status: TokenMailStatus.EXPIRED
                }
            });

            throw new Error("Token expirado");
        }

        const user = await this.getByEmail(tokenMail.email);
        if(!!!user) throw new Error("E-mail não encontrado");
        
        const passwordEc = CryptoPassword.generationHash(obj.password);
        
        const updatePasswordUser = prisma.user.update({
            where:{
                id: user.id,
            },
            data:{
                password: passwordEc,
            }
        });

        const updateTokenMail = prisma.tokenMail.update({
            where:{
                id: tokenMail.id
            },
            data:{
                status: TokenMailStatus.FINISHED
            }
        });
        
        const transaction = await prisma.$transaction([updatePasswordUser, updateTokenMail]);

        if(!transaction) throw new Error("Transaction fail");
    }

    async unlockLogin(token: string){

        const tokenMail = await prisma.tokenMail.findUnique({
            where:{
                token: token,
            }
        });

        if(!tokenMail) throw new Error("Token não existe");

        if(tokenMail.status == TokenMailStatus.EXPIRED) throw new Error("Token expirado");

        if(Token.isExpired(tokenMail.token_expiration)){

            await prisma.tokenMail.update({
                where:{
                    id: tokenMail.id
                },
                data:{
                    status: TokenMailStatus.EXPIRED
                }
            });

            throw new Error("Token expirado");
        }

        const user = await this.getByEmail(tokenMail.email);
        if(!!!user) throw new Error("E-mail não encontrado");

        const updateUser = prisma.user.update({
            where:{
                id: user.id,
            },
            data:{
                attempt_login: 0,
                status: UserStatus.ACTIVE
            }
        });

        const updateTokenMail = prisma.tokenMail.update({
            where:{
                id: tokenMail.id
            },
            data:{
                status: TokenMailStatus.FINISHED
            }
        });
        
        const transaction = await prisma.$transaction([updateUser, updateTokenMail]);

        if(!transaction) throw new Error("Transaction fail");
    }

}export default new UserService;