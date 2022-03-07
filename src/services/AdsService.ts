import prisma from './PrismaService';

class AdsService {

    async getById(val: string){        
        
        const result = await prisma.ads.findUnique({
            where:{
                id: val,
            }
        });

        if(!!!result) throw new Error("Anúncio não encontrado");
        
        return result;
    }

}; export default new AdsService;