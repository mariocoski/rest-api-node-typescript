
import Config from '../../Config';
import Signature, {Options} from './Signature';

export default (config: Config): Signature =>
  async (options: Options) => {
    return config.repo.createUserPermissions({
      userId: options.userId,
      role: options.role,
      permissions: options.permissions
    });
  };