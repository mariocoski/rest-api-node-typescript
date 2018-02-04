import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';
import hashPassword from '../../../../utils/hashPassword';
import {UserInstance} from '../../../../models/interfaces/user';
import {UniqueConstraintError} from 'sequelize';
import {UserAlreadyExistsError} from '../../../../utils/errors';
import { USER_MODEL_VISIBLE_PROPERTIES } from '../../../../utils/constants';

export default (config: Config) => {
  return async ({id, data}: Options) => {
      
      const password = typeof data.password === 'string' ? { password: await hashPassword(data.password) } : {};

      const [number, users] = await config.models.User.update(
        {
          ...data, 
          ...password,
          updated_at: (
            new Date().toDateString()
          )
        },
        {
          where : {id}
        }
      );

      return await config.models.User.findOne({
        attributes: USER_MODEL_VISIBLE_PROPERTIES,
        where: { id }  
      });
    }; 
}