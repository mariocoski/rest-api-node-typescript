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
import {API_ROUTE_V1} from '../../../utils/constants';

const app: express.Application = express();

const service = serviceFactory();

const presenterFacade = presenter({
  morganLogFormat: config.express.morganLogFormat,
  morganDirectory: config.express.morganDirectory,
  service,
  logger
});

app.use(API_ROUTE_V1, presenterFacade);

const request = createSupertest(app);

export default () => {

  beforeAll(async() => {
    await service.migrate();
  });

  beforeEach(async() => {
    await service.migrate();
  });
  
  afterEach(async() => {
    await service.rollback();
  });

  afterAll(async() => {
    await service.clearService();
  });
  
  return { service, request };
};