import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import {Request, Response} from 'express';
import {CREATED_201_HTTP_CODE} from '../../utils/constants';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    const {email, password, bio, firstname, lastname} = req.body;

    const {user, token} = await config.service.register({
      email, password, bio, firstname, lastname
    });

    res.status(CREATED_201_HTTP_CODE).json({user,token});
  });
}
  
  