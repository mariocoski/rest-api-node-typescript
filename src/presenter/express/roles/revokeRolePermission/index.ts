import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { OK } from 'http-status-codes';
import getAuthUser from '../../../../utils/jwt/getAuthUser';
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
  
    const user = await getAuthUser({req, service: config.service});

    hasPermission({user, permissionName: CAN_REVOKE_PERMISSION});

    validateRevokeRolePermission(req.params, ['role']);

    await config.service.revokeRolePermission(req.params);

    res.status(OK).json({success: true});
  });
};