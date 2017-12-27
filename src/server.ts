import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();
import * as iconvLite from 'iconv-lite';
iconvLite.encodingExists('foo');
import * as express from 'express';
import config from './config';
import logger from './logger';
import presenter from './presenter/express';
import serviceFactory from './service/factory';
import translatorFactory from './translator/factory';
import {API_ROUTE_V1} from './utils/constants';

const app: express.Application = express();

const service = serviceFactory();
const translator = translatorFactory();

const presenterFacade = presenter({
  morganLogFormat: config.express.morganLogFormat,
  morganDirectory: config.express.morganDirectory,
  service,
  logger,
  translator
});

const handleExit = (event: string) => {
  return (error?: any) => {
    if (error !== undefined) {
      logger.error(error.stack);
    }
    logger.info(event);
    process.exit();
  };
};

app.use(API_ROUTE_V1, presenterFacade);

app.listen(config.express.port, () => {
  logger.info(`Listening on port ${config.express.port}`);
  if (process.send !== undefined) {
    logger.info('Process ready');
    process.send('ready');
  }
  process.on('exit', handleExit('exit'));
  process.on('SIGINT', handleExit('SIGINT'));
  process.on('SIGTERM', handleExit('SIGTERM'));
  process.on('uncaughtException', handleExit('uncaughtException'));
});
