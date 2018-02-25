import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { OK } from 'http-status-codes'; 
import getAuthUser from '../../../../utils/jwt/getAuthUser';
import hasPermission from '../../../../utils/jwt/hasPermission';
import { CAN_UPDATE_COMMENT, TEXT_FIELD_LENGTH } from '../../../../utils/constants';
import { maxLength } from '../../../../utils/validate';
import { maybe, optional, checkType,composeRules, restrictToSchema }from 'rulr';

const validateUpdateComment = maybe(composeRules([
  restrictToSchema({
    user_id: optional(checkType(Number)),
    post_id: optional(checkType(Number)),
    body: optional(maxLength(TEXT_FIELD_LENGTH)),
  })
]));

export default (config: Config) => {
  return catchErrors(config, async (req, res) => {
  
    const user = await getAuthUser({req, service: config.service});

    hasPermission({user, permissionName: CAN_UPDATE_COMMENT});
 
    validateUpdateComment(req.body, ['comment']);
    
    const {comment_id} = req.params;
    
    const updateComment = await config.service.updateComment({id: comment_id, data: req.body});

    res.status(OK).json(updateComment);
  });

};