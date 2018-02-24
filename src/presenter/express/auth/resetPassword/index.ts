import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { OK_200_HTTP_CODE } from '../../utils/constants';
import { minLength, validateMatchingPasswords } from '../../../../utils/validate';
import { maybe, required, checkType, composeRules, first, restrictToSchema } from 'rulr';
import { v4 } from 'uuid';

const validateResetPassword = maybe(composeRules([
  restrictToSchema({
    token: required(checkType(String)),
    password: required(minLength(6)),
    password_confirmation: required(checkType(String)),
  }),
  first(checkType(Object), validateMatchingPasswords)
]));

export default (config: Config) => {
  return catchErrors(config, async (req, res) => {
   
    validateResetPassword(req.body, ['user']);

    const {token, password } = req.body;

    await config.service.resetPassword({token, password});
   
    const message = config.translator.passwordChangedSuccessfully();
    
    res.status(OK_200_HTTP_CODE).json({message});
  });
}
  
  