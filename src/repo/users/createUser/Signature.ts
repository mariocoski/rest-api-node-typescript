import AsyncHandler from '../../../utils/AsyncHandler';
import * as SequelizeStatic from 'sequelize';
import { UserAttributes} from '../../../models/interfaces/user';

export interface Options {
    readonly firstname?:  string | undefined;
    readonly lastname?:  string | undefined;
    readonly bio?:  string | undefined;
    readonly email:  string | undefined; 
    readonly password:  string | undefined;
}

type Signature = AsyncHandler<Options,UserAttributes>;

export default Signature;