import AsyncHandler from '../../../utils/AsyncHandler';
import {UserAttributes} from '../../../models/interfaces/user';
interface Options {
    readonly firstname?: string;
    readonly lastname?: string;
    readonly bio?: string;
    readonly email: string; 
    readonly password: string;
}

type Signature = AsyncHandler<Options, UserAttributes>;

export default Signature;