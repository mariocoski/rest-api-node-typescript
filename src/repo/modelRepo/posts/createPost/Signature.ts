import AsyncHandler from '../../../../utils/AsyncHandler';

export interface Options {
    readonly user_id: string;
    readonly title: string;
    readonly body: string;
}

type Signature = AsyncHandler<Options, any>;

export default Signature;