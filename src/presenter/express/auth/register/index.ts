import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import {Request, Response} from 'express';
import {CREATED_201_HTTP_CODE} from '../../utils/constants';
import {minLength, isEmail, validateMatchingPasswords} from '../../../../utils/validate';
import {maybe, required, restrictToSchema, checkType, composeRules, first}from 'rulr';

const validateRegister = maybe(composeRules([
  restrictToSchema({
    email: required(isEmail),
    password: required(minLength(6)),
    password_confirmation: required(checkType(String)),
  }),
  first(checkType(Object), validateMatchingPasswords)
]));

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    
    validateRegister(req.body, ['user']);
   
    const {email, password, bio, firstname, lastname} = req.body;
   
    const {user, token} = await config.service.register({
      email, password, bio, firstname, lastname
    });

    res.status(CREATED_201_HTTP_CODE).json({user,token});
  });
}
  
  