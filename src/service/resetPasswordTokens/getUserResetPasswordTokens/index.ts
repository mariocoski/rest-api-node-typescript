
import Config from '../../Config';
import Signature from './Signature';

export default (config: Config): Signature =>
  async (options) => {
    return config.repo.getUserResetPasswordTokens({
      userId: options.userId
    });
  };