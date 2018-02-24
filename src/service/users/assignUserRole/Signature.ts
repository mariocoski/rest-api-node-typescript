import AsyncHandler from '../../../utils/AsyncHandler';

export interface Options {
  readonly user_id: string;
  readonly role_id: string;
}

type Signature = AsyncHandler<Options, any>;

export default Signature;