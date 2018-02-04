import AsyncHandler from '../../../../utils/AsyncHandler';
import * as SequelizeStatic from 'sequelize';
import { UserAttributes} from '../../../../models/interfaces/user';

export interface Data {
  readonly firstname?: string;
  readonly lastname?: string;
  readonly bio?: string;
  readonly email?: string; 
  readonly password?: string;
}

export interface Options {
  readonly id: number;
  readonly data: Data
}


type Signature = AsyncHandler<Options,any>;

export default Signature;