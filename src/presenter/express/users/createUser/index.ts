import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { OK } from 'http-status-codes';
import getAuthUserAndPermissions from '../../../../utils/jwt/getAuthUserAndPermissions';
import hasPermission from '../../../../utils/jwt/hasPermission';
import { CAN_CREATE_USER } from '../../../../utils/constants';
import { minLength, isEmail, validateMatchingPasswords } from '../../../../utils/validate';
import { maybe, required, optional, checkType, composeRules, first, restrictToSchema } from 'rulr';
import * as R from 'ramda';

const validateCreateUser = maybe(composeRules([
  restrictToSchema({
    firstname: optional(checkType(String)),
    lastname: optional(checkType(String)),
    bio: optional(checkType(String)),
    email: required(isEmail),
    password: required(minLength(6)),
    password_confirmation: required(checkType(String)),
  }),
  first(checkType(Object), optional(validateMatchingPasswords))
]));

export default (config: Config) => {
  return catchErrors(config, async (req, res) => {
  
    const { permissions } = await getAuthUserAndPermissions({req, service: config.service});
    
    hasPermission({permissions, permissionName: CAN_CREATE_USER});
 
    validateCreateUser(req.body, ['user']);

    const fillable = [
      'firstname', 'lastname', 'bio', 'email', 'password'
    ];
    
    const data: any = R.pickBy((val:any, key:any)=>{
      return R.indexOf(key, fillable) !== -1 && val;
    }, req.body);
    
    const createdUser = await config.service.createUser(data);

    res.status(OK).json(createdUser);
  });
};