import AsyncHandler from '../../../utils/AsyncHandler';
import {UserAttributes} from '../../../models/interfaces/user';
interface Options {
    readonly firstname?: string | undefined;
    readonly lastname?: string | undefined;
    readonly bio?: string | undefined;
    readonly email: string | undefined; 
    readonly password: string | undefined;
}

type Signature = AsyncHandler<Options, Promise<UserAttributes>>;

export default Signature;