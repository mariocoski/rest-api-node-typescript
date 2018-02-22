import Config from '../../Config';
import Signature from './Signature';
import {Options} from './Signature';

export default (config: Config): Signature =>
  async ({id, data}: Options) => {
    return config.repo.updatePermission({
        id,
        data 
    });
  };