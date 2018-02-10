import AsyncHandler from '../../../../utils/AsyncHandler';
import { PostAttributes} from '../../../../models/interfaces/post';

export interface Options {
    readonly user_id: string;
    readonly title: string;
    readonly body: string;
}

type Signature = AsyncHandler<Options, PostAttributes>;

export default Signature;