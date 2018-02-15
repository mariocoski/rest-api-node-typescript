import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import {Request, Response} from 'express';
import {OK_200_HTTP_CODE} from '../../utils/constants';
import getAuthUser from '../../../../utils/jwt/getAuthUser';
import hasPermission from '../../../../utils/jwt/hasPermission';
import {CAN_UPDATE_COMMENT,VARCHAR_FIELD_LENGTH,TEXT_FIELD_LENGTH} from '../../../../utils/constants';
import {minLength,maxLength, isEmail, validateMatchingPasswords} from '../../../../utils/validate';
import {maybe, optional, checkType,composeRules, restrictToSchema}from 'rulr';
import * as R from 'ramda';

const validateUpdateComment = maybe(composeRules([
  restrictToSchema({
    user_id: optional(checkType(Number)),
    post_id: optional(checkType(Number)),
    body: optional(maxLength(TEXT_FIELD_LENGTH)),
  })
]));

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
  
    const user = await getAuthUser({req, service: config.service});

    hasPermission({user, permissionName: CAN_UPDATE_COMMENT});
 
    validateUpdateComment(req.body, ['comment']);
    
    const {comment_id} = req.params;

    const fillable = [
      'user_id', 'post_id', 'body'
    ];
    
    const data: any = R.pickBy((val:any, key:any)=>{
      return R.indexOf(key, fillable) !== -1 && val;
    }, req.body);
    
    const updateComment = await config.service.updateComment({id: comment_id, data});

    res.status(OK_200_HTTP_CODE).json(updateComment);
  });

};