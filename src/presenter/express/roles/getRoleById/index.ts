import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import {Request, Response} from 'express';
import {OK_200_HTTP_CODE} from '../../utils/constants';
import getAuthUser from '../../../../utils/jwt/getAuthUser';
import hasPermission from '../../../../utils/jwt/hasPermission';
import {CAN_GET_ROLE} from '../../../../utils/constants';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    
    const user = await getAuthUser({req, service: config.service});

    hasPermission({ user, permissionName: CAN_GET_ROLE});

    const {role_id} = req.params;

    const fetchedRole = await config.service.getRoleById({id: role_id});
    
    res.status(OK_200_HTTP_CODE).json(fetchedRole);
  });
}
  
  