
import Config from '../../Config';
import Signature from './Signature';

export default (config: Config): Signature =>
  async ({limit, offset, order}) => {
    return config.repo.getUsers({
      limit, offset, order
    });
  };