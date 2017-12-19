import Config from './Config';
import Service from './Service';
import {createUser, getUser, getUsers, updateUser, deleteUser} from './users';


export default (config: Config): Service => {
  return {
    createUser: createUser(config),
    getUser: createUser(config),
    getUsers: createUser(config),
    updateUser: createUser(config),
    deleteUser: createUser(config)
  };
};