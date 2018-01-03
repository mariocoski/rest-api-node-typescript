import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';
import hashPassword from '../../../../utils/hashPassword';
import {UserInstance} from '../../../../models/interfaces/user';
import ModelNotFoundError from '../../../../utils/errors/ModelNotFoundError';
import { USER_MODEL_VISIBLE_PROPERTIES } from '../../../../utils/constants';

export default (config: Config) => {
  return async (options: Options) => { 
    const limit = options.limit || 10; 
    const offest = options.offset || 0;

    const users: any = await config.models.User.findAndCountAll({
      attributes: USER_MODEL_VISIBLE_PROPERTIES,
      limit: limit,
      offset: options.offset,
      order: [
        ['id', 'DESC'],
        ['firstname', 'ASC'],
      ],
    })

    // return paginate({ 

    // });

    return {'data': users.rows, 'count': users.count};


   }; 
}