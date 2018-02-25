import { Response } from 'express';
import { 
  ModelAlreadyExistsError,
  ForbiddenError,UserAlreadyExistsError, InvalidResetPasswordTokenError, ExpiredResetPasswordTokenError, 
  InvalidCredentialsError, NotFoundError, ModelNotFoundError, UnauthorizedError, UnprocessableEntityError,
  MissingJwtTokenError, MissingJwtTokenExtractorError, ExpiredJwtTokenError, InvalidJwtTokenError
} from '../../../utils/errors';
import {Warnings} from 'rulr';
import translateWarnings from './translateWarnings';
import Config from '../Config';
import { UNPROCESSABLE_ENTITY, UNAUTHORIZED, INTERNAL_SERVER_ERROR, FORBIDDEN, NOT_FOUND, CONFLICT } from 'http-status-codes';

export interface Options {
  readonly config: Config;
  readonly errorId: string;
  readonly res: Response;
  readonly err: any;
}
 /* istanbul ignore next */
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
    const message: string = 'Unprocessable entity';
    logError(message);
    return res.status(UNPROCESSABLE_ENTITY).json({errors, message});
  }

  if(err instanceof InvalidCredentialsError){
    const message = translator.invalidCredentials();
    logError(message);
    return res.status(UNPROCESSABLE_ENTITY).json({message});
  }

  if(err instanceof MissingJwtTokenError){
    const message = translator.missingJwtToken();
    logError(message);
    return res.status(UNAUTHORIZED).json({message});
  }

  if(err instanceof MissingJwtTokenExtractorError){
    const message = translator.missingJwtTokenExtractor();
    logError(message);
    return res.status(UNAUTHORIZED).json({message});
  }

  if(err instanceof ExpiredJwtTokenError){
    const message = translator.expiredJwtToken();
    logError(message);
    return res.status(UNAUTHORIZED).json({message});
  }

  if(err instanceof InvalidJwtTokenError){
    const message = translator.invalidJwtToken();
    logError(message);
    return res.status(UNAUTHORIZED).json({message});
  }

  if(err instanceof ModelNotFoundError){
    const message = translator.modelNotFound(err.modelName);
    logError(message);
    return res.status(NOT_FOUND).json({message});
  }
  
  if(err instanceof InvalidResetPasswordTokenError){
    const message = translator.invalidResetPasswordToken();
    logError(message);
    return res.status(UNPROCESSABLE_ENTITY).json({message});
  }

  if(err instanceof ExpiredResetPasswordTokenError){
    const message = translator.expiredResetPasswordToken();
    logError(message);
    return res.status(UNPROCESSABLE_ENTITY).json({message});
  }

  if(err instanceof UserAlreadyExistsError){
    const message = translator.userAlreadyExists();
    logError(message);
    return res.status(CONFLICT).json({message});
  }

  if(err instanceof ModelAlreadyExistsError){
    const message = translator.modelAlreadyExists(err.modelName);
    logError(message);
    return res.status(CONFLICT).json({message});
  }

  if (err instanceof UnauthorizedError) {
    const message = translator.unauthorized();
    logError(message);
    return res.status(UNAUTHORIZED).json({message});
  }
  if (err instanceof ForbiddenError) {
    const message = translator.forbidden();
    logError(message);
    return res.status(FORBIDDEN).json({message});
  }

  {
  const message = translator.serverError();
    logError(message);
    console.log('server error',err, err.message);
    return res.status(INTERNAL_SERVER_ERROR).json({message});
  }
};