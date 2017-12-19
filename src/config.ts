import { config } from 'dotenv';
config();
import {getNumberOption, getStringOption, getBooleanOption} from './utils';

interface Config {
  nodeEnv: string;
  express: any;
  sequelize: any;
  winston: any;
  repoFactory: any;
}

export default {
  nodeEnv: getStringOption(process.env.NODE_ENV,'development'),
  express: {
    port: getNumberOption(process.env.EXPRESS_PORT, 3000),
    testPort: getNumberOption(process.env.EXPRESS_TEST_PORT, 3001),
    morganDirectory: getStringOption(
      process.env.EXPRESS_MORGAN_DIRECTORY,
      `${process.cwd()}/logs/access`,
    ),
    morganLogFormat: getStringOption(
      process.env.EXPRESS_MORGAN_LOG_FORMAT,
      ':method :url :remote-addr :referrer :date :status'
    )
  },
  sequelize: {
    development: {
      username: getStringOption(process.env.DEV_DB_USERNAME, 'root'),
      password: getStringOption(process.env.DEV_DB_PASSWORD,'password'),
      database: getStringOption(process.env.DEV_DB_NAME,'database_dev'),
      host:  getStringOption(process.env.DEV_DB_HOSTNAME,'localhost'),
      dialect: getStringOption(process.env.DEV_DB_DIALECT,'mysql'),
      operatorsAliases: getBooleanOption(process.env.DEV_DB_OPERATOR_ALIASES, false)
    },
    test: {
      username: getStringOption(process.env.TEST_DB_USERNAME,'root'),
      password: getStringOption(process.env.TEST_DB_PASSWORD,'password'),
      database: getStringOption(process.env.TEST_DB_NAME,'database_test'),
      host: getStringOption(process.env.TEST_DB_HOSTNAME,'localhost'),
      dialect: getStringOption(process.env.TEST_DB_DIALECT,'sqlite'),
      operatorsAliases: getBooleanOption(process.env.TEST_DB_OPERATOR_ALIASES, false)
    },
    production: {
      username: getStringOption(process.env.PROD_DB_USERNAME,'root'),
      password: getStringOption(process.env.PROD_DB_PASSWORD,'password'),
      database: getStringOption(process.env.PROD_DB_NAME,'database_prod'),
      host: getStringOption(process.env.PROD_DB_HOSTNAME,'localhost'),
      dialect: getStringOption(process.env.PROD_DB_DIALECT,'sqlite'),
      operatorsAliases: getBooleanOption(process.env.PROD_DB_OPERATOR_ALIASES, false)
    }
  },
  repoFactory: {
    name: getStringOption(defaultTo<any>(
      process.env.PRODUCTION_REPO,
      process.env.MODELS_REPO,
    ), 'knex'),
  },
  winston: {
    level: getStringOption(process.env.WINSTON_LEVEL, 'info'),
  }


} as Config;