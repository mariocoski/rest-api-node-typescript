
import Config from '../../Config';
import Signature from './Signature';
import {Options} from './Signature';

export default (config: Config): Signature =>
  async ({user_id, role_id}: Options) => {
    return config.repo.assignUserRole({
      user_id,
      role_id
    });
  };