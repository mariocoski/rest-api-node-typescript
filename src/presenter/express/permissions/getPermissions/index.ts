import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import {Request, Response} from 'express';
import {OK_200_HTTP_CODE} from '../../utils/constants';
import getAuthUser from '../../../../utils/jwt/getAuthUser';
import hasPermission from '../../../../utils/jwt/hasPermission';
import {CAN_GET_PERMISSIONS} from '../../../../utils/constants';
import {maybe, optional,checkType, composeRules, first, restrictToSchema}from 'rulr';
import {ModelNotFoundError} from '../../../../utils/errors';
import {isValidSortObject} from '../../../../utils/validate';

const validateGetPermissions = maybe(
  restrictToSchema({
    limit: optional(checkType(String)),
    offset: optional(checkType(String)),
    sort: optional(isValidSortObject())
  }),
);

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
      
    const user = await getAuthUser({req, service: config.service});

    hasPermission({ user, permissionName: CAN_GET_PERMISSIONS});

    validateGetPermissions(req.query,['roles']);

    const {limit, offset, sort} = req.query;

    const permissions = await config.service.getPermissions({limit, offset, order: sort});
    
    res.status(OK_200_HTTP_CODE).json(permissions);
  });
}
  
  