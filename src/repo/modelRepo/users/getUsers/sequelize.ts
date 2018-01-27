import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';
import hashPassword from '../../../../utils/hashPassword';
import {UserInstance} from '../../../../models/interfaces/user';
import ModelNotFoundError from '../../../../utils/errors/ModelNotFoundError';
import { USER_MODEL_VISIBLE_PROPERTIES } from '../../../../utils/constants';
import paginate from '../../../../presenter/express/utils/paginate';
import createOrderObject from '../../../../utils/createOrderObject';
import {API_ROUTE_V1, DEFAULT_USERS_PAGINATION_LIMIT,DEFAULT_USERS_PAGINATION_OFFSET,DEFAULT_USERS_ORDER } from '../../../../utils/constants';

export default (config: Config) => {
  return async (options: Options) => { 

    const limit: number = options.limit ? parseInt(options.limit) : DEFAULT_USERS_PAGINATION_LIMIT; 
    const offset: number = options.offset ? parseInt(options.offset) : DEFAULT_USERS_PAGINATION_OFFSET;
    const order: string[][] = options.order ? createOrderObject(options.order) : DEFAULT_USERS_ORDER;  

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