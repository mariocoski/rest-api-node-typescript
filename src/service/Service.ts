import { LoggerInstance } from 'winston';
export default interface Service {
  readonly logger: LoggerInstance,

}