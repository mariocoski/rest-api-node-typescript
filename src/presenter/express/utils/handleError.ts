import { Response } from 'express';
import ForbiddenError from '../../../utils/errors/ForbiddenError';
import UnauthorizedError from '../../../utils/errors/UnauthorizedError';
import Config from '../Config';

export interface Options {
  readonly config: Config;
  readonly errorId: string;
  readonly res: Response;
  readonly err: any;
}

export default ({ config, errorId, res, err }: Options): Response => {
  const { logger } = config;
  const logError = (msg: string, meta?: any) => {
    logger.error(`${errorId}: error handled - ${msg}`, meta);
  };
 
  return res;
};