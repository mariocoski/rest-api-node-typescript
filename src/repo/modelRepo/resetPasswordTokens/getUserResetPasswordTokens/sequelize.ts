import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';
import {ResetPasswordTokenAttributes} from '../../../../models/interfaces/reset_password_token';
import ModelNotFoundError from '../../../../utils/errors/ModelNotFoundError';

export default (config: Config) => {
  return async ({userId}: Options) => {
    return config.models.ResetPasswordToken.findAll({where: {user_id: userId}});
  }; 
}