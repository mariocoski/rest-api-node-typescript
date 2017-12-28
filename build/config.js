"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./utils/constants");
var utils_1 = require("./utils");
var ramda_1 = require("ramda");
exports.default = {
    lang: utils_1.getStringOption(process.env.LANG, 'en'),
    express: {
        port: utils_1.getNumberOption(process.env.EXPRESS_PORT, 3000),
        testPort: utils_1.getNumberOption(process.env.EXPRESS_TEST_PORT, 3001),
        morganDirectory: utils_1.getStringOption(process.env.EXPRESS_MORGAN_DIRECTORY, process.cwd() + "/logs/access"),
        morganLogFormat: utils_1.getStringOption(process.env.EXPRESS_MORGAN_LOG_FORMAT, ':method :url :remote-addr :referrer :date :status')
    },
    jwt: {
        secret: utils_1.getStringOption(process.env.JWT_SECRET, 'secret'),
        expiresIn: utils_1.getNumberOption(process.env.JWT_EXPIRES_IN, constants_1.ONE_HOUR),
        algoritm: utils_1.getStringOption(process.env.JWT_ALGORITM, 'HS256'),
    },
    sequelize: {
        development: {
            username: utils_1.getStringOption(process.env.DEV_DB_USERNAME, 'root'),
            password: utils_1.getStringOption(process.env.DEV_DB_PASSWORD, 'password'),
            database: utils_1.getStringOption(process.env.DEV_DB_NAME, 'database_dev'),
            host: utils_1.getStringOption(process.env.DEV_DB_HOSTNAME, 'localhost'),
            dialect: utils_1.getStringOption(process.env.DEV_DB_DIALECT, 'mysql'),
            operatorsAliases: utils_1.getBooleanOption(process.env.DEV_DB_OPERATOR_ALIASES, false)
        },
        test: {
            username: utils_1.getStringOption(process.env.TEST_DB_USERNAME, 'root'),
            password: utils_1.getStringOption(process.env.TEST_DB_PASSWORD, 'root'),
            database: utils_1.getStringOption(process.env.TEST_DB_NAME, 'database_test'),
            host: utils_1.getStringOption(process.env.TEST_DB_HOSTNAME, 'localhost'),
            dialect: utils_1.getStringOption(process.env.TEST_DB_DIALECT, 'sqlite'),
            operatorsAliases: utils_1.getBooleanOption(process.env.TEST_DB_OPERATOR_ALIASES, false)
        },
        production: {
            username: utils_1.getStringOption(process.env.PROD_DB_USERNAME, 'root'),
            password: utils_1.getStringOption(process.env.PROD_DB_PASSWORD, 'password'),
            database: utils_1.getStringOption(process.env.PROD_DB_NAME, 'database_prod'),
            host: utils_1.getStringOption(process.env.PROD_DB_HOSTNAME, 'localhost'),
            dialect: utils_1.getStringOption(process.env.PROD_DB_DIALECT, 'sqlite'),
            operatorsAliases: utils_1.getBooleanOption(process.env.PROD_DB_OPERATOR_ALIASES, false)
        }
    },
    repoFactory: {
        name: utils_1.getStringOption(ramda_1.defaultTo(process.env.PRODUCTION_REPO), 'sequelize'),
    },
    winston: {
        level: utils_1.getStringOption(process.env.WINSTON_LEVEL, 'info'),
        winstonDirectory: utils_1.getStringOption(process.env.WINSTON_DIRECTORY, process.cwd() + "/logs"),
    }
};
//# sourceMappingURL=config.js.map