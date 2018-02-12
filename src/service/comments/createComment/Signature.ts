import AsyncHandler from '../../../utils/AsyncHandler';
import {CommentAttributes} from '../../../models/interfaces/comment';

export interface Options {
    readonly user_id: number;
    readonly post_id: number;
    readonly body: string;
}

type Signature = AsyncHandler<Options, CommentAttributes>;

export default Signature