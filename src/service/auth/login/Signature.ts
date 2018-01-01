import AsyncHandler from '../../../utils/AsyncHandler';
import { UserAttributes} from '../../../models/interfaces/user';

interface Options {
    readonly email: string; 
    readonly password: string;
}
export interface Response {
    user: UserAttributes;
    token: string;
}

type Signature = AsyncHandler<Options, Response>;

export default Signature;