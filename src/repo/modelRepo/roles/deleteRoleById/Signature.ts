import AsyncHandler from '../../../../utils/AsyncHandler';

export interface Options {
  readonly id: number;
}

type Signature = AsyncHandler<Options, void>;

export default Signature;