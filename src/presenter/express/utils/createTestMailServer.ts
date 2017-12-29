const MailDev = require('maildev');
import config from '../../../config';

export default () => {
  return new Promise((resolve) => {
    const maildev = new MailDev({
      port : config.mail.port,
      ignoreTLS : true
    });
    maildev.close();
    maildev.listen();
    maildev.on('new', (email: any) => {
      resolve(email);
      maildev.close();
    });
  });
};