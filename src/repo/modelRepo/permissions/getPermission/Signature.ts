import AsyncHandler from '../../../../utils/AsyncHandler';

interface Options {
    readonly id: number;
}

type Signature = AsyncHandler<Options, UserModel>;

export default Signature;