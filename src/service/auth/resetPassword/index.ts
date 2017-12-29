
import Config from '../../Config';
import Signature from './Signature';
import {ModelNotFoundError,InvalidResetPasswordTokenError, ExpiredResetPasswordTokenError} from '../../../utils/errors';
import generateRandomToken from '../../../utils/generateRandomToken';
import globalConfig from '../../../config';
import { ONE_HOUR, MAIL_PASSWORD_CHANGED_SUBJECT } from '../../../utils/constants';
import * as moment from 'moment';
import hashPassword from '../../../utils/hashPassword';

export default (config: Config): Signature =>
  async ({token, password}) => {
      
    const resetPasswordToken: any = await config.repo.getResetPasswordTokenByToken({token});
    if(resetPasswordToken === null){
      throw new InvalidResetPasswordTokenError();
    }

    const tokenCreatedAt = moment(resetPasswordToken.created_at);
    const now = moment(new Date());

    if(moment.duration(now.diff(tokenCreatedAt)).asMilliseconds() > ONE_HOUR){
      throw new ExpiredResetPasswordTokenError();
    }
    
    const user: any = await config.repo.getUserById({id: resetPasswordToken.user_id});
    if(user === null){
      throw new InvalidResetPasswordTokenError();
    }

    const newPassword = await hashPassword(password);
    
    await config.repo.updateUser({
      id: user.id,
      password: newPassword,
      updatedAt: (new Date).toString()
    });

    await config.repo.deleteResetPasswordTokenById({id: resetPasswordToken.id});

    await config.repo.sendEmail({
      from: globalConfig.mail.from,
      to: user.email,
      subject: MAIL_PASSWORD_CHANGED_SUBJECT,
      text: `Hello,
      Password to your account has been changed. 
      If you have not requested that change contact immediately our support team.
      
      Thanks,
      Support Team`
    });
  };