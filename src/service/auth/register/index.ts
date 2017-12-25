import Config from '../../Config';
import Signature, {UserModel} from './Signature';
import generateToken from '../../../utils/jwt/generateToken';
import validateRegister from './validateRegister';

export default (config: Config): Signature => {
  return async (options) => {
    // validateRegister(options);
    const user: UserModel = await config.repo.createUser(options);

    const data = {

    };
    const token: string = await generateToken({data});
    return {user, token};
  };
}
