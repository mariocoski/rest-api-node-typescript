
import Config from '../../Config';
import Signature from './Signature';

export default (config: Config): Signature =>
  async (options) => {
    return config.repo.createPermission({
      name: options.name,
      label: options.label,
      description: options.description,
      createdAt: options.createdAt,
      updatedAt: options.updatedAt,
      deletedAt: options.deletedAt
    });
  };