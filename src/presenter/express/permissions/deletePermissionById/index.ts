import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { OK } from 'http-status-codes'; 
import getAuthUserAndPermissions from '../../../../utils/jwt/getAuthUserAndPermissions';
import hasPermission from '../../../../utils/jwt/hasPermission';
import { CAN_DELETE_PERMISSION } from '../../../../utils/constants';

export default (config: Config) => {
  return catchErrors(config, async (req, res) => {
  
    const { permissions } = await getAuthUserAndPermissions({req, service: config.service});
    
    hasPermission({permissions, permissionName: CAN_DELETE_PERMISSION});

    const {permission_id} = req.params;

    await config.service.deletePermissionById({id: permission_id});

    res.status(OK).json({success: true});
  });
};