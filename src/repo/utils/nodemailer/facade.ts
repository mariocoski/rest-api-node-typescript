import Config from './Config';
import {MailRepoInterface} from '../../Repo';
import sendEmail from '../../mailRepo/sendEmail/nodemailer';

export default (config: Config): MailRepoInterface => {
  return {
    sendEmail: sendEmail(config)
  };
};