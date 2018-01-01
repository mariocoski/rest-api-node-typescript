
import Config from '../../Config';
import Signature from './Signature';

export default (config: Config): Signature =>
  async (options) => {
    return config.repo.createRole({
      name: options.name,
      description: options.description,
      createdAt: options.createdAt,
      updatedAt: options.updatedAt,
      deletedAt: options.deletedAt
    });
  };