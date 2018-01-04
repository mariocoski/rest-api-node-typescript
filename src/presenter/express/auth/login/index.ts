import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import {Request, Response} from 'express';
import {OK_200_HTTP_CODE} from '../../utils/constants';
import { isEmail } from '../../../../utils/validate';
import {maybe, required, restrictToSchema, checkType}from 'rulr';

const validateLogin = maybe(
  restrictToSchema({
    email: required(isEmail),
    password: required(checkType(String))
  })
);

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
   
    validateLogin(req.body, ['user']);
   
    const {email, password} = req.body;
   
    const {user, token} = await config.service.login({
      email, password
    });

    res.status(OK_200_HTTP_CODE).json({user, token});
  });
}
  
  