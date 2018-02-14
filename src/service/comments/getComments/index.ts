
import Config from '../../Config';
import Signature from './Signature';
import {Options} from './Signature';

export default (config: Config): Signature =>
  async ({limit, offset, order} : Options) => {
    return config.repo.getComments({
      limit, offset, order
    });
  };