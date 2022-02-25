import { CreateUserDto } from '../dtos/services/UserServiceDto';
import UID from '../utils/UID';
import prisma from './PrismaService';

class UserService{

    async getByEmail(val: string){
        
        return await prisma.user.findUnique({
            where:{
                email: val,
            }
        });
    }

    async createUser(obj: CreateUserDto) {
        return await prisma.user.create({
            data:{
                id: UID.createDefault(),
                name: obj.name,
                status: "ACTIVE",
                created_at: new Date()
            }
        });
    }

}export default new UserService;