import repo from '../repo/factory';
import facade from './facade';
import logger from '../logger';

export default facade({
  repo,
  logger
});