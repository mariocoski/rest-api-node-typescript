
import Service from '../../service/Service';
import { LoggerInstance } from 'winston';

export default interface Config {
  readonly morganLogFormat: string,
  readonly morganDirectory: string,
  readonly service: Service,
  readonly logger: LoggerInstance;
}