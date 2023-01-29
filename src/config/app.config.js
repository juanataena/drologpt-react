require('dotenv').config();

const IS_PROD = process.env.NODE_ENV === 'production';
const { name, version } = require('../../package.json');

const envUrlMask = process.env.CIAM_ENV_URL_MARK || '';

const config = {
    appName: name,
    appVersion: process.env.APP_VERSION || version,
    env: process.env.NODE_ENV || 'development',
    logger: {
        level: process.env.LOGGER_LEVEL,
        colorize: (process.env.LOGGER_COLORIZE === 'true'),
        timestamp: (process.env.LOGGER_TIMESTAMP === 'true')
    }
};

module.exports = config;
