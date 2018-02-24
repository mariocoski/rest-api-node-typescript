import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { OK_200_HTTP_CODE } from '../../utils/constants';
import { isEmail } from '../../../../utils/validate';
import { maybe, required, restrictToSchema}from 'rulr';
import { ModelNotFoundError} from '../../../../utils/errors';
import {v4} from 'uuid';

const validateForgetPassword = maybe(
  restrictToSchema({
    email: required(isEmail)
  })
);

export default (config: Config) => {
  return catchErrors(config, async (req, res)=> {
   
    validateForgetPassword(req.body, ['user']);
   
    const {email} = req.body;
    const errorId = v4();

    try {
      await config.service.forgetPassword({email});
      const message = config.translator.passwordReminderSent(email);
      res.status(OK_200_HTTP_CODE).json({message});
    }catch(err){
      if(err instanceof ModelNotFoundError){
        config.logger.error(`${errorId}: error handled - user with ${email} - 
        tried to remind the password, but email does not exist`);
        const message = config.translator.passwordReminderSent(email);
        res.status(OK_200_HTTP_CODE).json({message});
      }else{
        throw err;
      }
    }
  });
}
  
  