import Config from '../../Config';
import Signature from './Signature';
import generateToken from '../../../utils/jwt/generateToken';
import {UserAttributes} from '../../../models/interfaces/user';

export default (config: Config): Signature => {
  return async (options) => {
    const user: any = await config.repo.createUser(options);

    await config.repo.createUserPermissions({userId: user.id});

    const data: any = {
      _id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname
    };
    const token: string = await generateToken({data});

    return {user, token};
  };
}

