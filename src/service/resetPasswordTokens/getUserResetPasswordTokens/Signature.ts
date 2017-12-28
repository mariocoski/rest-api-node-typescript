import AsyncHandler from '../../../utils/AsyncHandler';
import {ResetPasswordTokenAttributes} from '../../../models/interfaces/reset_password_token';

interface Options {
    readonly userId: number;
}

type Signature = AsyncHandler<Options, ResetPasswordTokenAttributes[]>;

export default Signature;