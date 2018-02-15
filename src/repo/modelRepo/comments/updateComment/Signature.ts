import AsyncHandler from '../../../../utils/AsyncHandler';
import {CommentAttributes} from '../../../../models/interfaces/comment';

export interface Data {
  readonly user_id?: string;
  readonly post_id?: string;
  readonly body?: string;
}

export interface Options {
  readonly id: string;
  readonly data: Data
}

type Signature = AsyncHandler<Options, CommentAttributes>;

export default Signature;