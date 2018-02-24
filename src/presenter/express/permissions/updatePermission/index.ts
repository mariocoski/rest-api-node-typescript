import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { OK_200_HTTP_CODE } from '../../utils/constants';
import getAuthUser from '../../../../utils/jwt/getAuthUser';
import hasPermission from '../../../../utils/jwt/hasPermission';
import { CAN_UPDATE_PERMISSION,VARCHAR_FIELD_LENGTH,TEXT_FIELD_LENGTH } from '../../../../utils/constants';
import { maxLength } from '../../../../utils/validate';
import { maybe, optional,composeRules, restrictToSchema } from 'rulr';

const validateUpdatePermission = maybe(composeRules([
  restrictToSchema({
    name: optional(maxLength(VARCHAR_FIELD_LENGTH)),
    label: optional(maxLength(VARCHAR_FIELD_LENGTH)),
    description: optional(maxLength(TEXT_FIELD_LENGTH)),
  })
]));

export default (config: Config) => {
  return catchErrors(config, async (req, res) => {
  
    const user = await getAuthUser({req, service: config.service});

    hasPermission({user, permissionName: CAN_UPDATE_PERMISSION});
 
    validateUpdatePermission(req.body, ['permission']);
    
    const {permission_id} = req.params;

    const updatedPermission = await config.service.updatePermission({id: permission_id, data: req.body});

    res.status(OK_200_HTTP_CODE).json(updatedPermission);
  });

};