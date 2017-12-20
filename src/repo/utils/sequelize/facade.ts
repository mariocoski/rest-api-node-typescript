import Config from './Config';
import Repo from '../../Repo';
import createUser from '../../users/createUser/sequelize';
import updateUser from '../../users/updateUser/sequelize';
import deleteUser from '../../users/deleteUser/sequelize';
import getUser from '../../users/getUser/sequelize';
import getUsers from '../../users/getUsers/sequelize';

export default (config: Config): Repo => {
  return {
    createUser: createUser(config),
    updateUser: updateUser(config),
    deleteUser: deleteUser(config),
    getUser: getUser(config),
    getUsers: getUsers(config)
  };
};