import AsyncHandler from '../../../utils/AsyncHandler';

export interface Options {
  readonly permission_id: string;
  readonly role_id: string;
}

type Signature = AsyncHandler<Options, any>;

export default Signature;