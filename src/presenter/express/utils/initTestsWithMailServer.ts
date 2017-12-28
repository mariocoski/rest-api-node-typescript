import config from '../../../config';
import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();
import * as iconvLite from 'iconv-lite';
iconvLite.encodingExists('foo');
import * as express from 'express';
import * as createSupertest from 'supertest';
import logger from '../../../logger';
import presenter from '../index';
import serviceFactory from '../../../service/factory';
import translatorFactory from '../../../translator/factory';
import {API_ROUTE_V1} from '../../../utils/constants';
import {SMTPServer} from 'smtp-server';

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

app.use(API_ROUTE_V1, presenterFacade);

const request = createSupertest(app);

export default () => {
  let mailServer:any;
  beforeAll(async() => {
   
    mailServer = new SMTPServer({
      onConnect: () => {
        console.log('running mail server');
      },
      onClose: () => {
        console.log('stopped mail server');
      }
    });
    mailServer.listen(2525,function(){
      console.log('ok');
    });
    await service.rollback();
    await service.migrate();
  });

  beforeEach(async() => {
    await service.clearService();
    await service.migrate();
  });

  afterAll(async() => {
    mailServer.close()
  });
  
  return { service, request };
};