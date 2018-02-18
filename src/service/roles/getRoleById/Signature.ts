import AsyncHandler from '../../../utils/AsyncHandler';
import {RoleAttributes} from '../../../models/interfaces/role';

export interface Options {
  readonly id: number;  
}

type Signature = AsyncHandler<Options, RoleAttributes>;

export default Signature;