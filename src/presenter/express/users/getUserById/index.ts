import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import {Request, Response} from 'express';
import {OK_200_HTTP_CODE} from '../../utils/constants';
import requireAuth from '../../../../utils/jwt/requireAuth';
import hasPermission from '../../../../utils/jwt/hasPermission';
export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    
    const user = await requireAuth({req, service: config.service});
    hasPermission({user, permissionName: 'user.show'});

    const {user_id} = req.params;

   // const user: any = await config.service.getUserById({id: user_id});
    
    res.status(OK_200_HTTP_CODE).json({});
  });
}
  
  