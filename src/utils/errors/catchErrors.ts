import {RequestHandler} from 'express';
import Config from '../../presenter/express/Config';
import {v4} from 'uuid';

export default (config: Config, handler: any) => {
  return (req: Request, res: Response): void => {
    handler(req, res).catch(async (err: any) => {
      const errorId = v4();
      config.logger.silly(`${errorId}: api request`, {
        headers: req.headers,
        method: req.method
      });
      return handleError({ config, errorId, res, err });
    });
  };
};