import AsyncHandler from '../../../utils/AsyncHandler';
import { UserAttributes} from '../../../models/interfaces/user';}

interface Options {
    readonly email: string;
}

type Signature = AsyncHandler<Options, void>;

export default Signature;