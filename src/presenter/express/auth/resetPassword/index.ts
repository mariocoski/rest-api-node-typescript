import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { OK } from 'http-status-codes';
import { minLength, validateMatchingPasswords } from '../../../../utils/validate';
import { maybe, required, checkType, composeRules, first, restrictToSchema } from 'rulr';

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
    
    res.status(OK).json({message});
  });
}
  
  