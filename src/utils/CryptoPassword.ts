import bcrypt from 'bcryptjs';

class CryptoPassword {

    generationHash(password: string) {
        return bcrypt.hashSync(password, 8);
    }

    comparePassword(password: string, hash: string){
        return bcrypt.compareSync(password, hash);
    }

    
} export default new CryptoPassword;