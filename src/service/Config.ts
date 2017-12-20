import Repo from '../repo/Repo';
import { LoggerInstance } from 'winston';

export default interface Config {
  readonly repo: Repo,
  readonly logger: LoggerInstance
}
