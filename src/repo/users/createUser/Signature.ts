import AsyncHandler from '../../../utils/AsyncHandler';
import * as SequelizeStatic from 'sequelize';
import { UserAttributes} from '../../../models/interfaces/user';

export interface Options {
    readonly firstname?:  string;
    readonly lastname?:  string;
    readonly bio?:  string;
    readonly email:  string; 
    readonly password:  string;
}

type Signature = AsyncHandler<Options,UserAttributes>;

export default Signature;