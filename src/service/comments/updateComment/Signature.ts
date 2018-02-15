import AsyncHandler from '../../../utils/AsyncHandler';
import {UserAttributes} from '../../../models/interfaces/user';

interface Data {
  readonly post_id?: string;
  readonly user_id?: string;
  readonly body?: string;
}

interface Options {
  readonly id: string;
  readonly data: Data
}

type Signature = AsyncHandler<Options, any>;

export default Signature;