import fascade from './facade';
import logger from '../logger';
import config from '../config';

export default fascade({
    sequelizeConfig: {
     
      logger
    },
    name: config.repoFactory.name,
  });