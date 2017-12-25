import Config from './Config';
import Repo from './Repo';
import sequelizeRepo from './utils/sequelize/facade';
import {models, sequelize} from '../models'; 
export default (config: Config): Repo => {
  /* istanbul ignore next */
  switch (config.name) {
    default: case 'sequelize':
      return sequelizeRepo({
        sequelizeInstance: sequelize,
        models: models
      });
  }
};