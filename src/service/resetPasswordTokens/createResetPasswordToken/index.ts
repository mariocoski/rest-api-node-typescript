import Config from '../../Config';
import Signature from './Signature';

export default (config: Config): Signature =>
  async (options) => {
    return config.repo.createResetPasswordToken({
      userId: options.userId,
      token: options.token,
      createdAt: options.createdAt,
      updatedAt: options.updatedAt
    });
  };