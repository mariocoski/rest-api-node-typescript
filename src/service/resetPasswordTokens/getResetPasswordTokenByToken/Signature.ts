import AsyncHandler from '../../../utils/AsyncHandler';
import {ResetPasswordTokenAttributes} from '../../../models/interfaces/reset_password_token';

export interface Options {
    readonly token: string;
}

type Signature = AsyncHandler<Options, ResetPasswordTokenAttributes>;

export default Signature;