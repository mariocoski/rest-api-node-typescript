import AsyncHandler from '../../../utils/AsyncHandler';
import * as SequelizeStatic from 'sequelize';

export interface Options {
}

type Signature = AsyncHandler<Options,string>;

export default Signature;