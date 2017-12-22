import * as moment from 'moment';
import * as winston from 'winston';
import config from './config';
import { LoggerInstance } from 'winston';
const getTime = () => moment().format('YYYY-MM-DD HH:mm:ss:SSS');

winston.cli();
export default new winston.Logger({
  exitOnError: false,
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      handleExceptions: true,
      humanReadableUnhandledException: true,
      level: config.winston.level,
      prettyPrint: true,
      stderrLevels: ['error'],
      timestamp: getTime,
    }),
    new winston.transports.File({ 
      level: config.winston.level, 
      filename: `${config.winston.winstonDirectory}/error.log`
    })
  ],
});