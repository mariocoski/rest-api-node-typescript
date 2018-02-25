import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { CREATED } from 'http-status-codes';
import getAuthUser from '../../../../utils/jwt/getAuthUser';
import hasPermission from '../../../../utils/jwt/hasPermission';
import { CAN_CREATE_POST, VARCHAR_FIELD_LENGTH, TEXT_FIELD_LENGTH } from '../../../../utils/constants';
import { maxLength } from '../../../../utils/validate';
import { maybe, required, checkType, composeRules, restrictToSchema } from 'rulr';

const validateCreatePost = maybe(composeRules([
  restrictToSchema({
    user_id: required(checkType(String)),
    title: required(maxLength(VARCHAR_FIELD_LENGTH)),
    body: required(maxLength(TEXT_FIELD_LENGTH)),
  })
]));

export default (config: Config) => {
  return catchErrors(config, async (req, res) => {
  
    const user = await getAuthUser({req, service: config.service});

    hasPermission({user, permissionName: CAN_CREATE_POST});
 
    validateCreatePost(req.body, ['post']);

    const createdPost = await config.service.createPost(req.body);

    res.status(CREATED).json(createdPost);
  });
};