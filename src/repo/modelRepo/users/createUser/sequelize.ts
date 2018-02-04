import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';
import hashPassword from '../../../../utils/hashPassword';
import {UserInstance} from '../../../../models/interfaces/user';
import {UniqueConstraintError} from 'sequelize';
import {UserAlreadyExistsError} from '../../../../utils/errors';
export default (config: Config) => {
  return async (options: Options) => {
    try{
      const user: UserInstance = await config.models.User.create({
        firstname: options.firstname,
        lastname: options.lastname,
        bio: options.bio,
        email: options.email, 
        password: await hashPassword(options.password)
      });
      return user.get({ plain: true });
    }catch(err){
      if(err instanceof UniqueConstraintError){
        throw new UserAlreadyExistsError();
      }
      throw err;
    }
  }; 
}