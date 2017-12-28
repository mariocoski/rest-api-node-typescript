import AsyncHandler from '../../../../utils/AsyncHandler';
import * as SequelizeStatic from 'sequelize';
import { PermissionAttributes} from '../../../../models/interfaces/permission';
import { RoleAttributes} from '../../../../models/interfaces/role';

export interface Options {
    readonly userId: number|string;
    readonly permissions?: PermissionAttributes[];
    readonly role?: RoleAttributes;
}

type Signature = AsyncHandler<Options,void>;

export default Signature;