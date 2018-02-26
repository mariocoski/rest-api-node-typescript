import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { OK } from 'http-status-codes';
import getAuthUserAndPermissions from '../../../../utils/jwt/getAuthUserAndPermissions';
import hasPermission from '../../../../utils/jwt/hasPermission';
import { CAN_UPDATE_USER } from '../../../../utils/constants';
import { minLength, isEmail, validateMatchingPasswords } from '../../../../utils/validate';
import { maybe, optional, checkType, composeRules, first, restrictToSchema }from 'rulr';
import * as R from 'ramda';

const validateUpdateUser = maybe(composeRules([
  restrictToSchema({
    firstname: optional(checkType(String)),
    lastname: optional(checkType(String)),
    bio: optional(checkType(String)),
    email: optional(isEmail),
    password: optional(minLength(6)),
    password_confirmation: optional(checkType(String)),
  }),
  first(checkType(Object), optional(validateMatchingPasswords))
]));

export default (config: Config) => {
  return catchErrors(config, async (req, res) => {
  
    const { permissions } = await getAuthUserAndPermissions({req, service: config.service});
    
    hasPermission({permissions, permissionName: CAN_UPDATE_USER});
 
    validateUpdateUser(req.body, ['user']);
    
    const {user_id} = req.params;

    const fillable = [
      'firstname', 'lastname', 'bio', 'email', 'password'
    ];
    
    const data = R.pickBy((val:any, key:any)=>{
      return R.indexOf(key, fillable) !== -1 && val;
    }, req.body);
    
    const updatedUser = await config.service.updateUser({id: user_id, data});

    res.status(OK).json(updatedUser);
  });
};