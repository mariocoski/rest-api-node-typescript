import AsyncHandler from '../../../utils/AsyncHandler';
import {RoleAttributes} from '../../../models/interfaces/role';

export interface Data {
  readonly name?: string;
  readonly description?: string;
}

export interface Options {
  readonly id: number;
  readonly data: Data
}

type Signature = AsyncHandler<Options, RoleAttributes>;

export default Signature;