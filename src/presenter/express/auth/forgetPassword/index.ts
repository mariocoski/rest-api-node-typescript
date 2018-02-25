import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { isEmail } from '../../../../utils/validate';
import { maybe, required, restrictToSchema}from 'rulr';
import { ModelNotFoundError} from '../../../../utils/errors';
import {v4} from 'uuid';
import {OK} from 'http-status-codes';

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
      res.status(OK).json({message});
    }catch(err){
      /* istanbul ignore next */
      if(err instanceof ModelNotFoundError){
        config.logger.error(`${errorId}: error handled - user with ${email} - 
        tried to remind the password, but email does not exist`);
        const message = config.translator.passwordReminderSent(email);
        res.status(OK).json({message});
      }else{
        throw err;
      }
    }
  });
}
  
  