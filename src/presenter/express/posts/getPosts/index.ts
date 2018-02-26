import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import getAuthUserAndPermissions from '../../../../utils/jwt/getAuthUserAndPermissions';
import hasPermission from '../../../../utils/jwt/hasPermission';
import { CAN_GET_POSTS } from '../../../../utils/constants';
import { maybe, optional, checkType, restrictToSchema }from 'rulr';
import { isValidSortObject } from '../../../../utils/validate';

const validateGetPosts = maybe(
  restrictToSchema({
    limit: optional(checkType(String)),
    offset: optional(checkType(String)),
    sort: optional(isValidSortObject())
  }),
);

export default (config: Config) => {
  return catchErrors(config, async (req, res) => {
      
    const { permissions } = await getAuthUserAndPermissions({req, service: config.service});
    
    hasPermission({ permissions, permissionName: CAN_GET_POSTS});

    validateGetPosts(req.query,['posts']);

    const {limit, offset, sort} = req.query;

    const posts = await config.service.getPosts({limit, offset, order: sort});
    
    res.status(OK).json(posts);
  });
}
  
  