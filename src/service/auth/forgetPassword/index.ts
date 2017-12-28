
import Config from '../../Config';
import Signature from './Signature';
import {ModelNotFoundError} from '../../../utils/errors';
import generateRandomToken from '../../../utils/generateRandomToken';

export default (config: Config): Signature =>
  async ({email}) => {

      const user: any = await config.repo.getUserByEmail({email});

      const token = generateRandomToken();
    
      await config.repo.createResetPasswordToken({userId: user.id, token});

      // await config.repo.sendEmail({

      // });

  };