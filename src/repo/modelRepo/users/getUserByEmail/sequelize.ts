import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';
import hashPassword from '../../../../utils/hashPassword';
import {UserInstance} from '../../../../models/interfaces/user';
import ModelNotFoundError from '../../../../utils/errors/ModelNotFoundError';
import { USER_MODEL_VISIBLE_PROPERTIES } from '../../../../utils/constants';

export default (config: Config) => {
  return async ({email}: Options) => {
    const user: UserInstance | null = await config.models.User.findOne({
      attributes: USER_MODEL_VISIBLE_PROPERTIES,
      where: { email }  
    });

    if(user === null) throw new ModelNotFoundError();

    return user.get({ plain: true });
  }; 
}