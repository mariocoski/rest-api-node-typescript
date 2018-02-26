import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { OK } from 'http-status-codes';
import getAuthUserAndPermissions from '../../../../utils/jwt/getAuthUserAndPermissions';
import hasPermission from '../../../../utils/jwt/hasPermission';
import { CAN_GET_PERMISSION } from '../../../../utils/constants';

export default (config: Config) => {
  return catchErrors(config, async (req, res) => {
    
    const { permissions } = await getAuthUserAndPermissions({req, service: config.service});
  
    hasPermission({ permissions, permissionName: CAN_GET_PERMISSION});

    const {permission_id} = req.params;

    const fetchedPermission = await config.service.getPermissionById({id: permission_id});
    
    res.status(OK).json(fetchedPermission);
  });
}
  
  