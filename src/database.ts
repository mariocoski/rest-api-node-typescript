import config from './config';

module.exports = {
  development: config.sequelize.development,
  test: config.sequelize.test,
  production: config.sequelize.production
}