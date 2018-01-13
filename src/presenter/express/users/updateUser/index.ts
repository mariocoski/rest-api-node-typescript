import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import {Request, Response} from 'express';
import {OK_200_HTTP_CODE} from '../../utils/constants';
import requireAuth from '../../../../utils/jwt/requireAuth';
import hasPermission from '../../../../utils/jwt/hasPermission';
import {PERMISSION_UPDATE_USER} from '../../../../utils/constants';
import {maybe, optional,checkType,composeRules, first, restrictToSchema}from 'rulr';
import {ModelNotFoundError} from '../../../../utils/errors';


export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    
    const authenticatedUser = await requireAuth({req, service: config.service});

    hasPermission({user: authenticatedUser, permissionName: PERMISSION_UPDATE_USER});

    const {user_id} = req.params;

    const data = req.body;
    
    const fetchedUser = await config.service.updateUser({id: user_id, data});

    res.status(OK_200_HTTP_CODE).json({});
  });

};