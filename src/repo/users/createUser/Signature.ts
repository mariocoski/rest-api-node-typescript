import AsyncHandler from '../../../utils/AsyncHandler';
import * as SequelizeStatic from 'sequelize';
import {UserInstance, UserAttributes} from '../../../models/interfaces/user';

export interface Options {
    readonly firstname?: string;
    readonly lastname?: string;
    readonly bio?: string;
    readonly email: string; 
    readonly password: string;
}

type Signature = AsyncHandler<Options,SequelizeStatic.Model<UserInstance,UserAttributes>>;

export default Signature;