
import Config from '../../Config';
import Signature from './Signature';

export default (config: Config): Signature =>
  async (options) => {
    return config.repo.createUser({
        firstname: options.firstname,
        lastname: options.lastname,
        bio: options.bio,
        email: options.email,
        password: options
    });
  };