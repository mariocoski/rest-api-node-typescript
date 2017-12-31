import { Response } from 'express';
import { 
  ForbiddenError,UserAlreadyExistsError, InvalidResetPasswordTokenError, ExpiredResetPasswordTokenError, 
  InvalidCredentialsError, NotFoundError, ModelNotFoundError, UnauthorizedError, UnprocessableEntityError,
  MissingJwtTokenError, MissingJwtTokenExtractorError, ExpiredJwtTokenError, InvalidJwtTokenError
} from '../../../utils/errors';
import {Warnings} from 'rulr';
import translateWarnings from './translateWarnings';
import Config from '../Config';
import {
  UNPROCESSABLE_ENTITY_MESSAGE,
  OK_200_HTTP_CODE,
  CREATED_201_HTTP_CODE,
  NO_CONTENT_204_HTTP_CODE,
  BAD_REQUEST_400_HTTP_CODE,
  UNAUTHORISED_401_HTTP_CODE,
  FORBIDDEN_403_HTTP_CODE,
  NOT_FOUND_404_HTTP_CODE,
  CONFLICT_409_HTTP_CODE,
  UNPROCESSABLE_ENTITY_422_HTTP_CODE,
  SERVER_ERROR_500_HTTP_CODE
} from './constants';


export interface Options {
  readonly config: Config;
  readonly errorId: string;
  readonly res: Response;
  readonly err: any;
}

export default ({ config, errorId, res, err }: Options): Response => {
   /* istanbul ignore next */
  const { logger, translator } = config;
  const logError = (msg: string, meta?: any) => {
    logger.error(`${errorId}: error handled - ${msg}`, meta);
  };
  
  if(err instanceof Warnings) {
    const warnings = err.warnings;
    const errors = warnings.map((warning) => {
      return translateWarnings(translator, warning);
    });
    const message: string = UNPROCESSABLE_ENTITY_MESSAGE;
    logError(message);
    return res.status(UNPROCESSABLE_ENTITY_422_HTTP_CODE).json({errors, message});
  }

  if(err instanceof InvalidCredentialsError){
    const message = translator.invalidCredentials();
    logError(message);
    return res.status(UNPROCESSABLE_ENTITY_422_HTTP_CODE).json({message});
  }

  if(err instanceof MissingJwtTokenError){
    const message = translator.missingJwtToken();
    logError(message);
    return res.status(UNAUTHORISED_401_HTTP_CODE).json({message});
  }

  if(err instanceof MissingJwtTokenExtractorError){
    const message = translator.missingJwtTokenExtractor();
    logError(message);
    return res.status(UNAUTHORISED_401_HTTP_CODE).json({message});
  }

  if(err instanceof ExpiredJwtTokenError){
    const message = translator.expiredJwtToken();
    logError(message);
    return res.status(UNAUTHORISED_401_HTTP_CODE).json({message});
  }

  if(err instanceof InvalidJwtTokenError){
    const message = translator.invalidJwtToken();
    logError(message);
    return res.status(UNAUTHORISED_401_HTTP_CODE).json({message});
  }

  if(err instanceof ModelNotFoundError){
    const message = translator.modelNotFound(err.modelName);
    logError(message);
    return res.status(NOT_FOUND_404_HTTP_CODE).json({message});
  }
  
  if(err instanceof InvalidResetPasswordTokenError){
    const message = translator.invalidResetPasswordToken();
    logError(message);
    return res.status(UNPROCESSABLE_ENTITY_422_HTTP_CODE).json({message});
  }

  if(err instanceof ExpiredResetPasswordTokenError){
    const message = translator.expiredResetPasswordToken();
    logError(message);
    return res.status(UNPROCESSABLE_ENTITY_422_HTTP_CODE).json({message});
  }

  if(err instanceof UserAlreadyExistsError){
    const message = translator.userAlreadyExists();
    logError(message);
    return res.status(CONFLICT_409_HTTP_CODE).json({message});
  }
  if (err instanceof UnauthorizedError) {
    const message = translator.unauthorized();
    logError(message);
    return res.status(UNAUTHORISED_401_HTTP_CODE).json({message});
  }
  if (err instanceof ForbiddenError) {
    const message = translator.forbidden();
    logError(message);
    return res.status(FORBIDDEN_403_HTTP_CODE).json({message});
  }
  {
  const message = translator.serverError();
    logError(message);
    console.log(err);
    return res.status(SERVER_ERROR_500_HTTP_CODE).json({message});
  }
};