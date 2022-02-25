import { CreateUserDto } from '../dtos/services/UserServiceDto';
import { UserStatus } from '../enums/UserStatus';
import UID from '../utils/UID';
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

    async create(obj: CreateUserDto) {
        return await prisma.user.create({
            data:{
                id: UID.createDefault(),
                email: obj.email,
                password: obj.password,
                status: UserStatus.ACTIVE,
                type: obj.type,
                attempt_login: 0,
                created_at: new Date()
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

    async register(){
        
        // Receber os dados
        // Encriptar a senha
        // Cria tokenMail e salva no db
        // Envia e-mail para confirmação do cadastro
        
    }

    async confirmationRegister(){        
        
        // recebe token
        // verifica se token e valido
        // finaliza cadastro
        // finaliza tokenMail
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