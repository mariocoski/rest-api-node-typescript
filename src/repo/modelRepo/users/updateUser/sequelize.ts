import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';
import hashPassword from '../../../../utils/hashPassword';
import {UserInstance} from '../../../../models/interfaces/user';
import {UniqueConstraintError} from 'sequelize';
import {UserAlreadyExistsError} from '../../../../utils/errors';
import * as R from 'ramda';

export default (config: Config) => {
  return async (options: Options) => {
      const fillable = [
        'firstname', 'lastname', 'bio', 'email', 'password', 'updatedAt'
      ];
      const data = R.pickBy((val:any, key:any)=>{
        return R.indexOf(key, fillable) !== -1 && val;
      }, options);
      
      await config.models.User.update({...data}, {where : {id: options.id}});
  }; 
}