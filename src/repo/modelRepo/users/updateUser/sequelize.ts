import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';
import hashPassword from '../../../../utils/hashPassword';
import {UserInstance} from '../../../../models/interfaces/user';
import {UniqueConstraintError} from 'sequelize';
import {UserAlreadyExistsError} from '../../../../utils/errors';
import { USER_MODEL_VISIBLE_PROPERTIES } from '../../../../utils/constants';
import * as R from 'ramda';

export default (config: Config) => {
  return async (options: Options) => {
      const fillable = [
        'firstname', 'lastname', 'bio', 'email', 'password'
      ];
      const data = R.pickBy((val:any, key:any)=>{
        return R.indexOf(key, fillable) !== -1 && val;
      }, options);
      
      await config.models.User.update({...data, updated_at: (new Date().toDateString())}, {where : {id: options.id}});
      
      return await config.models.User.findOne({
        attributes: USER_MODEL_VISIBLE_PROPERTIES,
        where: { id : options.id }  
      });
    }; 
}