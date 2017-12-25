import Config from '../../utils/sequelize/Config';
import CommonPromiseSignature from '../CommonPromiseSignature';

export default (config: Config) => async () => {
    await Promise.resolve(config.sequelizeInstance.drop());
  };