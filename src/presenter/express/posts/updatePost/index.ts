import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { OK } from 'http-status-codes';
import getAuthUserAndPermissions from '../../../../utils/jwt/getAuthUserAndPermissions';
import hasPermission from '../../../../utils/jwt/hasPermission';
import { CAN_UPDATE_POST, VARCHAR_FIELD_LENGTH, TEXT_FIELD_LENGTH } from '../../../../utils/constants';
import { maxLength } from '../../../../utils/validate';
import { maybe, optional, checkType,composeRules, restrictToSchema }from 'rulr';

const validateUpdatePost = maybe(composeRules([
  restrictToSchema({
    user_id: optional(checkType(Number)),
    title: optional(maxLength(VARCHAR_FIELD_LENGTH)),
    body: optional(maxLength(TEXT_FIELD_LENGTH)),
  })
]));

export default (config: Config) => {
  return catchErrors(config, async (req, res) => {
  
    const { permissions } = await getAuthUserAndPermissions({req, service: config.service});
    
    hasPermission({permissions, permissionName: CAN_UPDATE_POST});
 
    validateUpdatePost(req.body, ['post']);
    
    const {post_id} = req.params;
    
    const updatePost = await config.service.updatePost({id: post_id, data: req.body});

    res.status(OK).json(updatePost);
  });
};