import { Request, Response} from 'express';
import Config from '../Config';
import handleError from './handleError';
import {v4} from 'uuid';
import ExpressHanlder from '../../../utils/ExpressHandler';

import {UnprocessableEntityError} from '../../../utils/errors';
export default (config: Config, handler: ExpressHanlder) => {
  return async (req: Request, res: Response) => {
    try {
      await handler(req, res);
    }catch(err){
      const errorId = v4();
      config.logger.silly(`${errorId}: api request`, {
        headers: req.headers,
        method: req.method
      });
      return handleError({ config, errorId, res, err });
    }
  };
};