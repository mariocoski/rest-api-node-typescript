import AsyncHandler from '../../../utils/AsyncHandler';
import {PermissionAttributes} from '../../../models/interfaces/permission';

interface Options {
    readonly userId: number;
}

type Signature = AsyncHandler<Options, PermissionAttributes[]>;

export default Signature;