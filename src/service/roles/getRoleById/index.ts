
import Config from '../../Config';
import Signature from './Signature';
import {Options} from './Signature';

export default (config: Config): Signature =>
  async ({id}: Options) => {
    return config.repo.getRoleById({ id });
  };