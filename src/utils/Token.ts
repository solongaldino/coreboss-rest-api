import { EXPIRATION_TOKEN_MIN_DEFAULT, SECRET_TOKEN } from '../configs/GlobalConfig';
import crypto from 'crypto';

class Token{

    create(time = EXPIRATION_TOKEN_MIN_DEFAULT){

        const hash = crypto.scryptSync(new Date().toString(), SECRET_TOKEN, 32).toString('hex');
        const hash2 = crypto.scryptSync(new Date().toString(), SECRET_TOKEN, 32).toString('hex');

        const date = new Date();

        date.setMinutes(date.getMinutes() + time);

        return {
            hash: hash+hash2,
            expiration: date
        }
    }

    isExpired(date: Date){
        
        return date < new Date() ? true : false;
    }

} export default new Token;