import repoFactory from '../repo/factory';
import facade from './facade';
import logger from '../logger';
import Service from './Service';

const repo = repoFactory();

export default (): Service => facade({
  repo,
  logger
});