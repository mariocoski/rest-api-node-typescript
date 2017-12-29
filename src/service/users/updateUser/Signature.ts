import AsyncHandler from '../../../utils/AsyncHandler';
import {UserAttributes} from '../../../models/interfaces/user';
interface Options {
  readonly id: number;
  readonly firstname?: string;
  readonly lastname?: string;
  readonly bio?: string;
  readonly email?: string; 
  readonly password?: string;
  readonly updatedAt?: string;
}

type Signature = AsyncHandler<Options, any>;

export default Signature;