import Config from './Config';
import {ModelRepoInterface} from '../../Repo';
import createUser from '../../modelRepo/users/createUser/sequelize';
import updateUser from '../../modelRepo/users/updateUser/sequelize';
// import deleteUser from '../../modelRepo/users/deleteUser/sequelize';
import getUserById from '../../modelRepo/users/getUserById/sequelize';
import getUserByEmail from '../../modelRepo/users/getUserByEmail/sequelize';
import getUserPermissions from '../../modelRepo/permissions/getUserPermissions/sequelize';
import createUserPermissions from '../../modelRepo/permissions/createUserPermissions/sequelize';
import getUsers from '../../modelRepo/users/getUsers/sequelize';
import migrate from '../../modelRepo/commons/migrate/sequelize';
import rollback from '../../modelRepo/commons/rollback/sequelize';
import clearRepo from '../../modelRepo/commons/clearRepo/sequelize';
import createResetPasswordToken from '../../modelRepo/resetPasswordTokens/createResetPasswordToken/sequelize';
import getUserResetPasswordTokens from '../../modelRepo/resetPasswordTokens/getUserResetPasswordTokens/sequelize';
import getResetPasswordTokenByToken from '../../modelRepo/resetPasswordTokens/getResetPasswordTokenByToken/sequelize';
import deleteResetPasswordTokenById from '../../modelRepo/resetPasswordTokens/deleteResetPasswordTokenById/sequelize';
import createRole from '../../modelRepo/roles/createRole/sequelize';
import createPermission from '../../modelRepo/permissions/createPermission/sequelize';

export default (config: Config): ModelRepoInterface => {
  return {
    getResetPasswordTokenByToken: getResetPasswordTokenByToken(config),
    deleteResetPasswordTokenById: deleteResetPasswordTokenById(config),
    createResetPasswordToken: createResetPasswordToken(config),
    getUserResetPasswordTokens: getUserResetPasswordTokens(config),
    createUser: createUser(config),
    getUserById: getUserById(config),
    getUsers: getUsers(config),
    updateUser: updateUser(config),
    getUserByEmail: getUserByEmail(config),
    createRole: createRole(config),
    createPermission: createPermission(config),
    createUserPermissions: createUserPermissions(config),
    getUserPermissions: getUserPermissions(config),
    clearRepo: clearRepo(config),
    migrate: migrate(config),
    rollback: rollback(config)
  };
};