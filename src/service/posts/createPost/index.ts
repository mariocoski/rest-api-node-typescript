
import Config from '../../Config';
import Signature from './Signature';
import {Options} from './Signature';

export default (config: Config): Signature =>
  async (options: Options) => {
    return config.repo.createPost(options);
  };