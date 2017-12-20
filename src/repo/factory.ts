import fascade from './facade';
import config from '../config';

export default fascade({
    name: config.repoFactory.name,
    sequelize: config.sequelize
});