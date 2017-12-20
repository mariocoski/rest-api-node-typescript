import fascade from './facade';
import logger from '../logger';
import config from '../config';

export default fascade({

    name: config.repoFactory.name,
});