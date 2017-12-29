import AsyncHandler from '../../../utils/AsyncHandler';
import * as SequelizeStatic from 'sequelize';

export interface Options {
  from: string;
  to: string;
  subject: string;
  text: string;
}

type Signature = AsyncHandler<Options,any>;

export default Signature;