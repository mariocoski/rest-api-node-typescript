import Config from './Config';
import Repo from './Repo';
import sequelizeRepo from './utils/sequelize/facade';

export default (config: Config): Repo => {
  /* istanbul ignore next */
  switch (config.name) {
    default: case 'sequelize':
      return sequelizeRepo(config.sequelize);
  }
};