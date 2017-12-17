import { Router } from 'express';
import Config from './Config';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as fs from 'fs';
import * as cors from 'cors';
import * as FileStreamRotator from 'file-stream-rotator';

export default (config: Config): Router => {
  const router: Router = Router();

  /* CORS */
  const corsMiddleware = cors({
    origin: '*',
    preflightContinue: true
  });
  router.use(corsMiddleware);
  
  /* BODY PARSER */
  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());

  /* HELMET */ 
  router.use(helmet());

  /* COMPRESSION */
  router.use(compression());

  /* MORGAN */
  const accessLogStream: NodeJS.WritableStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: `${config.morganDirectory}/access-%DATE%.log`,
    frequency: 'daily',
    verbose: false,
  });

  router.use(morgan(
    config.morganLogFormat,
    { stream: accessLogStream }
  ));
  
  return router;
};