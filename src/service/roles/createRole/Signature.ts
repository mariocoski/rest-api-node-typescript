import AsyncHandler from '../../../utils/AsyncHandler';
import {RoleAttributes} from '../../../models/interfaces/role';

export interface Options {
    readonly name: string;
    readonly description?: string;
}

type Signature = AsyncHandler<Options, RoleAttributes>;

export default Signature;