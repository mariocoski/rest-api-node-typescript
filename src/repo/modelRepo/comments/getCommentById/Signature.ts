import AsyncHandler from '../../../../utils/AsyncHandler';
import { CommentAttributes } from '../../../../models/interfaces/comment';

export interface Options {
    readonly id: number;
}

type Signature = AsyncHandler<Options, CommentAttributes>;

export default Signature;
