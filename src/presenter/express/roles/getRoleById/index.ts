import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { OK } from 'http-status-codes';
import getAuthUserAndPermissions from '../../../../utils/jwt/getAuthUserAndPermissions';
import hasPermission from '../../../../utils/jwt/hasPermission';
import { CAN_GET_ROLE } from '../../../../utils/constants';

export default (config: Config) => {
  return catchErrors(config, async (req, res) => {
    
    const { permissions } = await getAuthUserAndPermissions({req, service: config.service});
    
    hasPermission({ permissions, permissionName: CAN_GET_ROLE});

    const {role_id} = req.params;

    const fetchedRole = await config.service.getRoleById({id: role_id});
    
    res.status(OK).json(fetchedRole);
  });
}
  
  