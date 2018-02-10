import AsyncHandler from '../../../utils/AsyncHandler';
import {PostAttributes} from '../../../models/interfaces/post';

export interface Options {
  readonly id: number;  
}

type Signature = AsyncHandler<Options, PostAttributes>;

export default Signature;