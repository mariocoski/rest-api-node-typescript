import AsyncHandler from '../../../utils/AsyncHandler';
import {PermissionAttributes} from '../../../models/interfaces/permission';

export interface Options {
  readonly id: number;  
}

type Signature = AsyncHandler<Options, PermissionAttributes>;

export default Signature;