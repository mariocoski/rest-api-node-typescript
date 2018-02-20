
import Config from '../../Config';
import Signature from './Signature';
import {Options} from './Signature';

export default (config: Config): Signature =>
  async ({role_id, permission_id}: Options) => {
    return config.repo.assignRolePermission({
      role_id,
      permission_id
    });
  };