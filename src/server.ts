import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();
import * as iconvLite from 'iconv-lite';
iconvLite.encodingExists('foo');
import {sequelize} from './models';
import * as express from 'express';
import config from './config';
import logger from './logger';
import presenter from './presenter/express';
import serviceFactory from './service/factory';
import {apiRouteV1} from './utils/constants';

const app = express();

// const serviceFacade = serviceFactory();

const presenterFacade = presenter({
  morganLogFormat: config.express.morganLogFormat,
  morganDirectory: config.express.morganDirectory,
  // service: serviceFacade,
  logger
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

async function dbInit(){
  try {
    await sequelize.sync();
  }catch(e){
   
  }
}

if(config.nodeEnv !== 'test'){
  dbInit();
}

app.use(apiRouteV1, presenterFacade);

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



