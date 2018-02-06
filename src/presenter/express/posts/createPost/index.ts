import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import {Request, Response} from 'express';
import {OK_200_HTTP_CODE} from '../../utils/constants';
import getAuthUser from '../../../../utils/jwt/getAuthUser';
import hasPermission from '../../../../utils/jwt/hasPermission';
import {CAN_CREATE_POST} from '../../../../utils/constants';
import {minLength, isEmail, validateMatchingPasswords} from '../../../../utils/validate';
import {maybe, required, optional, checkType,composeRules, first, restrictToSchema} from 'rulr';
import * as R from 'ramda';

// const validateCreateUser = maybe(composeRules([
//   restrictToSchema({
//     firstname: optional(checkType(String)),
//     lastname: optional(checkType(String)),
//     bio: optional(checkType(String)),
//     email: required(isEmail),
//     password: required(minLength(6)),
//     password_confirmation: required(checkType(String)),
//   }),
//   first(checkType(Object), optional(validateMatchingPasswords))
// ]));

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
  
    const user = await getAuthUser({req, service: config.service});

    hasPermission({user, permissionName: CAN_CREATE_POST});
 
    // validateCreateUser(req.body, ['user']);

    const fillable = [
      'firstname', 'lastname', 'bio', 'email', 'password'
    ];
    
    const data: any = R.pickBy((val:any, key:any)=>{
      return R.indexOf(key, fillable) !== -1 && val;
    }, req.body);
    
    const createdUser = await config.service.createPost(data);

    res.status(OK_200_HTTP_CODE).json(createdUser);
  });

};