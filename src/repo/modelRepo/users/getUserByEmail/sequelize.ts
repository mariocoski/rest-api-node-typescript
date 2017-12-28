import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';
import hashPassword from '../../../../utils/hashPassword';
import {UserInstance} from '../../../../models/interfaces/user';
import ModelNotFoundError from '../../../../utils/errors/ModelNotFoundError';

export default (config: Config) => {
  return async ({email}: Options) => {
    const user: UserInstance | null = await config.models.User.findOne({where: {email}});

    if(user === null) throw new ModelNotFoundError();

    return user.get({ plain: true });
  }; 
}