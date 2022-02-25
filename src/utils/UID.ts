import { uid } from 'uid';
import { UID_LENGTH } from '../configs/GlobalConfig';

class UID{

    createDefault(){
        return uid(UID_LENGTH);
    }

} export default new UID;