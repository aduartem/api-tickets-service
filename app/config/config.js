require('dotenv').config();

const logger = require('./winston');

const config = {
  dev: {
    app: {
      name: process.env.APP_NAME || 'api-tickets-service',
      port: process.env.PORT || '3002',
    },
    db: {
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'root',
      database: process.env.DB_NAME || 'authentication',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || '3306',
      dialect: process.env.DB_DIALECT || 'mysql',
      dialectOptions: {
        timezone: process.env.DB_TIMEZONE === 'true' || false,
      },
      logging: process.env.DB_LOGGING === 'true' || true,
    },
  },
  qa: {
    app: {
      name: process.env.APP_NAME,
      port: process.env.PORT,
    },
    db: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: process.env.DB_DIALECT,
      dialectOptions: {
        timezone: process.env.DB_TIMEZONE === 'true' || false,
      },
      logging: process.env.DB_LOGGING === 'true' || true,
    },
  },
  production: {
    app: {
      name: process.env.APP_NAME,
      port: process.env.PORT,
    },
    db: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: process.env.DB_DIALECT,
      dialectOptions: {
        timezone: process.env.DB_TIMEZONE === 'true' || false,
      },
      logging: process.env.DB_LOGGING === 'true' || true,
    },
  },
};
logger.info('process.env.NODE_ENV: %s', process.env.NODE_ENV);
module.exports = config[process.env.NODE_ENV];
