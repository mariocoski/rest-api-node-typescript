import AsyncHandler from '../../../utils/AsyncHandler';
import * as SequelizeStatic from 'sequelize';
import {UserInstance, UserAttributes} from '../../../models/interfaces/user';

export interface Options {
    readonly token: string;
    readonly password: string;
}

type Signature = AsyncHandler<Options,void>;

export default Signature;