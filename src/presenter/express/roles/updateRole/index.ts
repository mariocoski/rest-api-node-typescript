import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { OK } from 'http-status-codes'; 
import getAuthUserAndPermissions from '../../../../utils/jwt/getAuthUserAndPermissions';
import hasPermission from '../../../../utils/jwt/hasPermission';
import { CAN_UPDATE_ROLE, VARCHAR_FIELD_LENGTH,TEXT_FIELD_LENGTH } from '../../../../utils/constants';
import { maxLength } from '../../../../utils/validate';
import { maybe, optional, composeRules, restrictToSchema } from 'rulr';

const validateUpdatePost = maybe(composeRules([
  restrictToSchema({
    name: optional(maxLength(VARCHAR_FIELD_LENGTH)),
    description: optional(maxLength(TEXT_FIELD_LENGTH)),
  })
]));

export default (config: Config) => {
  return catchErrors(config, async (req, res) => {
  
    const { permissions } = await getAuthUserAndPermissions({req, service: config.service});
    
    hasPermission({permissions, permissionName: CAN_UPDATE_ROLE});
 
    validateUpdatePost(req.body, ['role']);
    
    const {role_id} = req.params;

    const updateRole = await config.service.updateRole({id: role_id, data: req.body});

    res.status(OK).json(updateRole);
  });
};