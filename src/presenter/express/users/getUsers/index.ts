import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { OK } from 'http-status-codes';
import getAuthUser from '../../../../utils/jwt/getAuthUser';
import hasPermission from '../../../../utils/jwt/hasPermission';
import { CAN_GET_USERS } from '../../../../utils/constants';
import { maybe, optional, checkType, restrictToSchema } from 'rulr';
import { isValidSortObject } from '../../../../utils/validate';

const validateGetUsers = maybe(
  restrictToSchema({
    limit: optional(checkType(String)),
    offset: optional(checkType(String)),
    sort: optional(isValidSortObject())
  }),
);

export default (config: Config) => {
  return catchErrors(config, async (req, res) => {
      
    const user = await getAuthUser({req, service: config.service});

    hasPermission({ user, permissionName: CAN_GET_USERS});

    validateGetUsers(req.query,['users']);

    const {limit, offset, sort} = req.query;

    const users = await config.service.getUsers({limit, offset, order: sort});
    
    res.status(OK).json(users);
  });
}
  
  