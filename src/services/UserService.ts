import { BASE_URL_FRONT_END } from '../configs/GlobalConfig';
import { AuthDto, ConfirmationRegisterDto, RegisterDto } from '../dtos/services/UserServiceDto';
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
        // encriptar nova senha
        // verificar senha antiga        
        return await prisma.user.update({
            where:{
                id: id,
            },
            data:{
                password: password,
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

        const url = BASE_URL_FRONT_END+"/user/confirmationRegister?token="+tokenMail.token;
        
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

        const isValidPassword = CryptoPassword.comparePassword(obj.password, user.password);
        if(!isValidPassword) throw new Error("Senha incorreta");

        const xAccessToken = AuthJwtService.login({
            id: user.id
        });

        return xAccessToken;
    }

    async isAuthenticated(token: string){
        return AuthJwtService.isAuthenticated(token);
    }

    async passwordRecoveryRequest(){
        
        // Recebe email
        // Verifica se email existe
        // Cria um tokenMail
        // Envia e-mail com instruções e link para formulario de nova senha        
    }

    async confirmPasswordRecovery(){
        // recebe token e senha
        // verifica token
        // token e valido
        // pega usuário by email vinculado ao token
        // encripa nova senha
        // salva nova senha
        // finaliza tokenMail
    }

}export default new UserService;