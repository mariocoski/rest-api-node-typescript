import {Sequelize} from 'sequelize';
import {SequelizeModels} from '../../../models';

export default interface Config {
  readonly sequelizeInstance: Sequelize;
  readonly models: SequelizeModels;
}
