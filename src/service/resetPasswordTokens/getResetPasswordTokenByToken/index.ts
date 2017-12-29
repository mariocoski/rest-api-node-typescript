
import Config from '../../Config';
import Signature, {Options} from './Signature';

export default (config: Config): Signature =>
  async (options: Options) => {
    return config.repo.getResetPasswordTokenByToken({
      token: options.token
    });
  };