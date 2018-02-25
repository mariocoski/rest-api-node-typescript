import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { CREATED } from 'http-status-codes';
import { minLength, isEmail, validateMatchingPasswords } from '../../../../utils/validate';
import { maybe, required, restrictToSchema, checkType, composeRules, first }from 'rulr';

const validateRegister = maybe(composeRules([
  restrictToSchema({
    email: required(isEmail),
    password: required(minLength(6)),
    password_confirmation: required(checkType(String)),
  }),
  first(checkType(Object), validateMatchingPasswords)
]));

export default (config: Config) => {
  return catchErrors(config, async (req, res) => {
    
    validateRegister(req.body, ['user']);
   
    const {email, password, bio, firstname, lastname} = req.body;
   
    const {user, token} = await config.service.register({
      email, password, bio, firstname, lastname
    });

    res.status(CREATED).json({user,token});
  });
}
  
  