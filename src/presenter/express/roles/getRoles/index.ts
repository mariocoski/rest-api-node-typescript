import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { OK } from 'http-status-codes';
import getAuthUser from '../../../../utils/jwt/getAuthUser';
import hasPermission from '../../../../utils/jwt/hasPermission';
import { CAN_GET_ROLES } from '../../../../utils/constants';
import { maybe, optional, checkType, restrictToSchema } from 'rulr';
import { isValidSortObject } from '../../../../utils/validate';

const validateGetRoles = maybe(
  restrictToSchema({
    limit: optional(checkType(String)),
    offset: optional(checkType(String)),
    sort: optional(isValidSortObject())
  }),
);

export default (config: Config) => {
  return catchErrors(config, async (req, res) => {
      
    const user = await getAuthUser({req, service: config.service});

    hasPermission({ user, permissionName: CAN_GET_ROLES});

    validateGetRoles(req.query,['roles']);

    const {limit, offset, sort} = req.query;

    const roles = await config.service.getRoles({limit, offset, order: sort});
    
    res.status(OK).json(roles);
  });
}
  
  