import Repo from '../repo/Repo';
import { LoggerInstance } from 'winston';

export default interface Config {
  repo: Repo,
  logger: LoggerInstance
}
