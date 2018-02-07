import AsyncHandler from '../../../utils/AsyncHandler';

export interface Options {
    readonly user_id: string;
    readonly title: string;
    readonly description: string;
}

type Signature = AsyncHandler<Options, void>;

export default Signature;