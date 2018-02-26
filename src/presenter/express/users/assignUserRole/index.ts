import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { OK } from 'http-status-codes';
import getAuthUserAndPermissions from '../../../../utils/jwt/getAuthUserAndPermissions';
import hasPermission from '../../../../utils/jwt/hasPermission';
import { CAN_ASSIGN_ROLE } from '../../../../utils/constants';
import { maybe, required, checkType, composeRules, restrictToSchema } from 'rulr';

const validateAssignUserRole = maybe(composeRules([
  restrictToSchema({
    role_id: required(checkType(String))
  })
]));

export default (config: Config) => {
  return catchErrors(config, async (req, res) => {
  
    const { permissions } = await getAuthUserAndPermissions({req, service: config.service});
    
    hasPermission({permissions, permissionName: CAN_ASSIGN_ROLE});
 
    validateAssignUserRole(req.body, ['user']);

    const {user_id} = req.params;
    const {role_id} = req.body;

    await config.service.assignUserRole({
      user_id, role_id
    });

    res.status(OK).json({success: true});
  });
};