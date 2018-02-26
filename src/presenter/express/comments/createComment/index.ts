import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { CREATED } from 'http-status-codes'; 
import getAuthUserAndPermissions from '../../../../utils/jwt/getAuthUserAndPermissions';
import hasPermission from '../../../../utils/jwt/hasPermission';
import { CAN_CREATE_COMMENT, TEXT_FIELD_LENGTH } from '../../../../utils/constants';
import { maxLength } from '../../../../utils/validate';
import { maybe, required, checkType, composeRules, restrictToSchema } from 'rulr';

const validateCreateComment = maybe(composeRules([
  restrictToSchema({
    user_id: required(checkType(Number)),
    post_id: required(checkType(Number)),
    body: required(maxLength(TEXT_FIELD_LENGTH)),
  })
]));
   
export default (config: Config) => {
  return catchErrors(config, async (req, res) => {
  
    const { permissions } = await getAuthUserAndPermissions({req, service: config.service});

    hasPermission({permissions, permissionName: CAN_CREATE_COMMENT});
 
    validateCreateComment(req.body, ['comment']);
    
    const createdComment = await config.service.createComment(req.body);
    
    res.status(CREATED).json(createdComment);
  });
};