import {RequestHandler, Request, Response} from 'express';
import Config from '../Config';
import handleError from './handleError';
import {v4} from 'uuid';

export default (config: Config, handler: any) => {
  return (req: Request, res: Response): Response => {
    try {
      return handler(req, res);
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