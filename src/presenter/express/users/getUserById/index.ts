import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import {Request, Response} from 'express';
import {OK_200_HTTP_CODE} from '../../utils/constants';
import requireAuth from '../../../../utils/jwt/requireAuth';
import hasPermission from '../../../../utils/jwt/hasPermission';
import {PERMISSION_GET_USER} from '../../../../utils/constants';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    
    const authenticatedUser = await requireAuth({req, service: config.service});
    hasPermission({user: authenticatedUser, permissionName: PERMISSION_GET_USER});

    const {user_id} = req.params;

   const fetchedUser = await config.service.getUserById({id: user_id});
    
    res.status(OK_200_HTTP_CODE).json(fetchedUser);
  });
}
  
  