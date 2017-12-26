import Config from './Config';
import Repo from '../../Repo';
//import register from '../../auth/register/sequelize';
import createUser from '../../users/createUser/sequelize';
// import updateUser from '../../users/updateUser/sequelize';
// import deleteUser from '../../users/deleteUser/sequelize';
import getUser from '../../users/getUser/sequelize';
import getUserPermissions from '../../permissions/getUserPermissions/sequelize';
import createUserPermissions from '../../permissions/createUserPermissions/sequelize';
// import getUsers from '../../users/getUsers/sequelize';
import migrate from '../../commons/migrate/sequelize';
import rollback from '../../commons/rollback/sequelize';
import clearRepo from '../../commons/clearRepo/sequelize';

export default (config: Config): Repo => {
  return {
    createUser: createUser(config),
    getUser: getUser(config),
    createUserPermissions: createUserPermissions(config),
    getUserPermissions: getUserPermissions(config),
    clearRepo: clearRepo(config),
    migrate: migrate(config),
    rollback: rollback(config)
  };
};