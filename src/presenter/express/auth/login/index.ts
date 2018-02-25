import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { isEmail } from '../../../../utils/validate';
import { maybe, required, restrictToSchema, checkType } from 'rulr';
import { OK } from 'http-status-codes';

const validateLogin = maybe(
  restrictToSchema({
    email: required(isEmail),
    password: required(checkType(String))
  })
);

export default (config: Config) => {
  return catchErrors(config, async (req, res) => {
   
    validateLogin(req.body, ['user']);
   
    const {email, password} = req.body;
   
    const {user, token} = await config.service.login({
      email, password
    });

    res.status(OK).json({user, token});
  });
}
  
  