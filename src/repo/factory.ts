import fascade from './facade';
import config from '../config';
import Repo from './Repo';

export default (): Repo => fascade({
    name: config.repoFactory.name,
    sequelize: config.sequelize
});