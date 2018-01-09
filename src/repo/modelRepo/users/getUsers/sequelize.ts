import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';
import hashPassword from '../../../../utils/hashPassword';
import {UserInstance} from '../../../../models/interfaces/user';
import ModelNotFoundError from '../../../../utils/errors/ModelNotFoundError';
import { USER_MODEL_VISIBLE_PROPERTIES } from '../../../../utils/constants';
import paginate from '../../../../presenter/express/utils/paginate';
import {API_ROUTE_V1} from '../../../../utils/constants';

export default (config: Config) => {
  return async (options: Options) => { 

    const limit: number = options.limit || 10; 
    const offset: number = options.offset || 0;
    const order: string[][] = options.order || [
      ['id', 'desc']
    ];
    const {count, rows} = await config.models.User.findAndCountAll({
      attributes: USER_MODEL_VISIBLE_PROPERTIES,
      limit,
      offset,
      order
    });

    return paginate({ 
      total: count,
      paginatedData: rows,
      baseUrl: `${API_ROUTE_V1}/users`,
      offset,
      limit
    });
   }; 
}