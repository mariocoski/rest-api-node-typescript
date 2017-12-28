import AsyncHandler from '../../../../utils/AsyncHandler';

interface Data {
  readonly firstname?: string;
  readonly lastname?: string;
  readonly bio?: string;
  readonly email?: string; 
  readonly password?: string;
}

interface Options {
    readonly id: number;
    readonly data: Data
}

type Signature = AsyncHandler<Options, void>;

export default Signature;