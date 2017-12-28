import Config from './Config';
import {MailRepoInterface} from '../../Repo';
import sendEmail from '../../mailRepo/sendEmail/mailgun';

export default (config: Config): MailRepoInterface => {
  return {
    sendEmail: sendEmail(config)
  };
};