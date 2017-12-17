import Config from './Config';
import Service from './Service';
import logger from '../logger';
export default (config: Config): Service => {
  return {
    logger: logger,

  };
};