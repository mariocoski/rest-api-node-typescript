import AsyncHandler from '../../../utils/AsyncHandler';
import * as SequelizeStatic from 'sequelize';
import { PermissionAttributes} from '../../../models/interfaces/permission';

export interface Options {
    readonly userId: number;
}

type Signature = AsyncHandler<Options,PermissionAttributes[]>;

export default Signature;