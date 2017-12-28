import Config from '../../../utils/sequelize/Config';

export default (config: Config) => async () => {
    await Promise.resolve(config.sequelizeInstance.dropAllSchemas({logging:false}));
  };