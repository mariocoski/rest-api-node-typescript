import fascade from './facade';
import config from '../config';
import Repo from './Repo';

export default (): Repo => fascade({
    modelRepoName: config.modelRepo.name,
    mailRepoName:  config.mailRepo.name,
    sequelize: config.sequelize
});