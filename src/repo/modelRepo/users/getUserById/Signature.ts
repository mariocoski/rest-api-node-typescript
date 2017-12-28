import AsyncHandler from '../../../../utils/AsyncHandler';
import * as SequelizeStatic from 'sequelize';
import { UserAttributes} from '../../../../models/interfaces/user';

export interface Options {
    readonly id: number;
}

type Signature = AsyncHandler<Options,UserAttributes>;

export default Signature;