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

export type UserModel = SequelizeStatic.Model<UserInstance,UserAttributes>;

export interface Response {
  user: any;
  token: string;
}

type Signature = AsyncHandler<Options,Response>;

export default Signature;