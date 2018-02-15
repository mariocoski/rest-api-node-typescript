import AsyncHandler from '../../../utils/AsyncHandler';
import {UserAttributes} from '../../../models/interfaces/user';

interface Data {
  readonly firstname?: string;
  readonly lastname?: string;
  readonly bio?: string;
  readonly email?: string; 
  readonly password?: string;
}

interface Options {
  readonly id: string;
  readonly data: Data
}

type Signature = AsyncHandler<Options, any>;

export default Signature;