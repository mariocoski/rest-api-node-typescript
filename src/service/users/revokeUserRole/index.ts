
import Config from '../../Config';
import Signature from './Signature';
import {Options} from './Signature';

export default (config: Config): Signature =>
  async ({role_id, user_id}: Options) => {
    return config.repo.revokeUserRole({
      role_id,
      user_id
    });
  };