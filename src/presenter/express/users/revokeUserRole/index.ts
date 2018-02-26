import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { OK } from 'http-status-codes';
import getAuthUserAndPermissions from '../../../../utils/jwt/getAuthUserAndPermissions';
import hasPermission from '../../../../utils/jwt/hasPermission';
import { CAN_REVOKE_ROLE, VARCHAR_FIELD_LENGTH, TEXT_FIELD_LENGTH } from '../../../../utils/constants';
import { maybe, required, checkType, composeRules, restrictToSchema } from 'rulr';

const validateRevokeRole = maybe(composeRules([
  restrictToSchema({
    user_id: required(checkType(String)),
    role_id: required(checkType(String))
  })
]));

export default (config: Config) => {
  return catchErrors(config, async (req, res) => {
  
    const { permissions } = await getAuthUserAndPermissions({req, service: config.service});
    
    hasPermission({permissions, permissionName: CAN_REVOKE_ROLE});

    validateRevokeRole(req.params, ['user']);

    await config.service.revokeUserRole(req.params);

    res.status(OK).json({success: true});
  });
};