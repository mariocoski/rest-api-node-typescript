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

  beforeAll(async() => {
    await service.migrate();
  });

  beforeEach(async() => {
    await service.rollback();
    await service.migrate();
  });

  afterAll(async() => {
    await service.clearService();
  });
  
  return { service, request };
};