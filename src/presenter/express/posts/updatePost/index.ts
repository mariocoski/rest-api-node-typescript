import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import {Request, Response} from 'express';
import {OK_200_HTTP_CODE} from '../../utils/constants';
import getAuthUser from '../../../../utils/jwt/getAuthUser';
import hasPermission from '../../../../utils/jwt/hasPermission';
import {CAN_UPDATE_POST,VARCHAR_FIELD_LENGTH,TEXT_FIELD_LENGTH} from '../../../../utils/constants';
import {minLength,maxLength, isEmail, validateMatchingPasswords} from '../../../../utils/validate';
import {maybe, optional, checkType,composeRules, restrictToSchema}from 'rulr';
import * as R from 'ramda';

const validateUpdatePost = maybe(composeRules([
  restrictToSchema({
    user_id: optional(checkType(Number)),
    title: optional(maxLength(VARCHAR_FIELD_LENGTH)),
    body: optional(maxLength(TEXT_FIELD_LENGTH)),
  })
]));

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
  
    const user = await getAuthUser({req, service: config.service});

    hasPermission({user, permissionName: CAN_UPDATE_POST});
 
    validateUpdatePost(req.body, ['post']);
    
    const {post_id} = req.params;

    const fillable = [
      'user_id', 'title', 'description'
    ];
    
    const data: any = R.pickBy((val:any, key:any)=>{
      return R.indexOf(key, fillable) !== -1 && val;
    }, req.body);
    
    const updatePost = await config.service.updatePost({id: post_id, data});

    res.status(OK_200_HTTP_CODE).json(updatePost);
  });

};