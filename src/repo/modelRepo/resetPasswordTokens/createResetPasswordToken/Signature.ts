import AsyncHandler from '../../../../utils/AsyncHandler';
import * as SequelizeStatic from 'sequelize';

export interface Options {
  readonly userId: number;
  readonly token: string;
}

type Signature = AsyncHandler<Options,void>;

export default Signature;