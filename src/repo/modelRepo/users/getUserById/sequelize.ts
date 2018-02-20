import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';
import hashPassword from '../../../../utils/hashPassword';
import { USER_MODEL_VISIBLE_PROPERTIES } from '../../../../utils/constants';
import {UserInstance} from '../../../../models/interfaces/user';
import ModelNotFoundError from '../../../../utils/errors/ModelNotFoundError';

export default (config: Config) => {
  return async (options: Options) => {
    const user: UserInstance | null = await config.models.User.findOne({
      attributes: USER_MODEL_VISIBLE_PROPERTIES,
      include: [ { model: config.models.Role, as: 'roles' },{ model: config.models.Post, as: 'posts' }  ],
      where: { id : options.id }  
    });
    if(user === null) throw new ModelNotFoundError('User');

    return user.get({ plain: true });
  }; 
}