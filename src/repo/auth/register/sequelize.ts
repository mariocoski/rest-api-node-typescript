import Signature from './Signature';
import Config from '../../utils/sequelize/Config';
import {Options} from './Signature';
import hashPassword from '../../../utils/hashPassword';

export default async (config: Config) => {
  return async (options: Options) => {
    return await Promise.resolve(config.models.User.create({
      firstname: options.firstname,
      lastname: options.lastname,
      bio: options.bio,
      email: options.email, 
      password: await hashPassword(options.password)
    }));
  };
  
}