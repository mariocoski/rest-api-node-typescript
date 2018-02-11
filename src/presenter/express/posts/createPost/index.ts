import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import {Request, Response} from 'express';
import {CREATED_201_HTTP_CODE} from '../../utils/constants';
import getAuthUser from '../../../../utils/jwt/getAuthUser';
import hasPermission from '../../../../utils/jwt/hasPermission';
import {CAN_CREATE_POST, VARCHAR_FIELD_LENGTH, TEXT_FIELD_LENGTH} from '../../../../utils/constants';
import {minLength, maxLength, isEmail, validateMatchingPasswords} from '../../../../utils/validate';
import {maybe, required, optional, checkType,composeRules, first, restrictToSchema} from 'rulr';
import * as R from 'ramda';

const validateCreatePost = maybe(composeRules([
  restrictToSchema({
    user_id: required(checkType(String)),
    title: required(maxLength(VARCHAR_FIELD_LENGTH)),
    body: required(maxLength(TEXT_FIELD_LENGTH)),
  })
]));

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
  
    const user = await getAuthUser({req, service: config.service});

    hasPermission({user, permissionName: CAN_CREATE_POST});
 
    validateCreatePost(req.body, ['post']);

    const createdUser = await config.service.createPost(req.body);

    res.status(CREATED_201_HTTP_CODE).json(createdUser);
  });

};