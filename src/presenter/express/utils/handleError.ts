import { Response } from 'express';
import { ForbiddenError,UserAlreadyExistsError, NotFoundError, ModelNotFoundError, UnauthorizedError, UnprocessableEntityError} from '../../../utils/errors';
import {Warnings} from 'rulr';
import translateWarnings from './translateWarnings';
import Config from '../Config';
import {
  OK_200_HTTP_CODE,
  CREATED_201_HTTP_CODE,
  NO_CONTENT_204_HTTP_CODE,
  BAD_REQUEST_400_HTTP_CODE,
  UNAUTHORISED_401_HTTP_CODE,
  FORBIDDEN_403_HTTP_CODE,
  NOT_FOUND_404_HTTP_CODE,
  CONFLICT_409_HTTP_CODE,
  UNPROCESSABLE_ENTITY_422_HTTP_CODE,
  SERVER_ERROR_500_HTTP_CODE,
} from './constants';


export interface Options {
  readonly config: Config;
  readonly errorId: string;
  readonly res: Response;
  readonly err: any;
}

export default ({ config, errorId, res, err }: Options): Response => {
  const { logger, translator } = config;
  const logError = (msg: string, meta?: any) => {
    logger.error(`${errorId}: error handled - ${msg}`, meta);
  };
  
  if(err instanceof Warnings) {
    const warnings = err.warnings;
    const errors = warnings.map((warning) => {
      return translateWarnings(translator, warning);
    });
    return res.status(UNPROCESSABLE_ENTITY_422_HTTP_CODE).json({errors});
  }

  if(err instanceof UserAlreadyExistsError){
    const message = translator.userAlreadyExists();
    return res.status(CONFLICT_409_HTTP_CODE).json({message});
  }
 
  return res.status(500);
};