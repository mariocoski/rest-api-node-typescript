import AsyncHandler from '../../../utils/AsyncHandler';

export interface Options {
  readonly firstname?: string;
  readonly lastname?: string;
  readonly bio?: string;
  readonly email: string; 
  readonly password: string;
}

type Signature = AsyncHandler<Options, void>;

export default Signature;