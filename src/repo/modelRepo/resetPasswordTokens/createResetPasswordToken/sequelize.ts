import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';

export default (config: Config) => {
  return async ({userId, token, createdAt, updatedAt}: Options) => {
    await config.models.ResetPasswordToken.create({
      user_id: userId,
      token,
      created_at: createdAt || (new Date).toString(),
      updated_at: updatedAt || (new Date).toString()
    });
  }; 
}