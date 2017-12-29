import AsyncHandler from '../../../../utils/AsyncHandler';
import {ResetPasswordTokenAttributes} from '../../../../models/interfaces/reset_password_token';

export interface Options {
  readonly id: number;
}

type Signature = AsyncHandler<Options, any>;

export default Signature;