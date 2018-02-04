
import Config from '../../Config';
import Signature from './Signature';

export default (config: Config): Signature =>
  async ({id, data}) => {
    return config.repo.updateUser({
        id,
        data 
    });
  };