import AsyncHandler from '../../../utils/AsyncHandler';
import {PostAttributes} from '../../../models/interfaces/post';

export interface Data {
  readonly user_id?: string;
  readonly title?: string;
  readonly body?: string;
}

export interface Options {
  readonly id: number;
  readonly data: Data
}

type Signature = AsyncHandler<Options, PostAttributes>;

export default Signature;