import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { OK } from 'http-status-codes';
import getAuthUserAndPermissions from '../../../../utils/jwt/getAuthUserAndPermissions';
import hasPermission from '../../../../utils/jwt/hasPermission';
import { CAN_REVOKE_PERMISSION, VARCHAR_FIELD_LENGTH, TEXT_FIELD_LENGTH } from '../../../../utils/constants';
import { maybe, required, checkType,composeRules, restrictToSchema } from 'rulr';

const validateRevokeRolePermission = maybe(composeRules([
  restrictToSchema({
    permission_id: required(checkType(String)),
    role_id: required(checkType(String))
  })
]));

export default (config: Config) => {
  return catchErrors(config, async (req, res) => {
  
    const { permissions } = await getAuthUserAndPermissions({req, service: config.service});
    
    hasPermission({permissions, permissionName: CAN_REVOKE_PERMISSION});

    validateRevokeRolePermission(req.params, ['role']);

    await config.service.revokeRolePermission(req.params);

    res.status(OK).json({success: true});
  });
};