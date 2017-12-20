import Config from './Config';
import Repo from './Repo';
import knexRepo from './utils/sequelize/facade';

export default (config: Config): Repo => {
  /* istanbul ignore next */
  switch (config.name) {
    default: case 'sequezlie':
      return sequelizeRepo(config.seq);
  }
};