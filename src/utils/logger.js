import winston from 'winston';
import expressWinston from 'express-winston';
import WinstonCloudWatch from 'winston-cloudwatch';

const {
  NODE_ENV,
  CLOUDWATCH_GROUP_NAME,
  CLOUDWATCH_ACCESS_KEY,
  CLOUDWATCH_SECRET_KEY,
  CLOUDWATCH_REGION
} = process.env;

const genCloudWatchTransport = () => {
  // Set cloudwatch config
  const cloudwatchConfig = {
    logGroupName: CLOUDWATCH_GROUP_NAME,
    logStreamName: `${CLOUDWATCH_GROUP_NAME}-${NODE_ENV}`,
    awsAccessKeyId: CLOUDWATCH_ACCESS_KEY,
    awsSecretKey: CLOUDWATCH_SECRET_KEY,
    awsRegion: CLOUDWATCH_REGION,
    messageFormatter: ({ level, message, additionalInfo, meta }) =>
      `[${level}] : ${message} \nAdditional Info: ${JSON.stringify(meta)}}`
  };

  return new WinstonCloudWatch(cloudwatchConfig);
};

// Set transports
let transports = [
  new winston.transports.Console({
    format: winston.format.simple()
  })
];

let format = winston.format.combine(
  winston.format.colorize(),
  winston.format.json()
);

// Configure Cloudwatch-specific options
if (NODE_ENV === 'production') {
  transports = [...transports, genCloudWatchTransport()];
  format = winston.format.combine(winston.format.json());
}

// Setup options
const opts = {
  level: 'info',
  format,
  transports,
  defaultMeta: { service: 'App' },
  meta: true
};

// Expose logger
export const logger = winston.createLogger(opts);

// Expose logging middleware
export const loggingMiddleware = () =>
  expressWinston.logger({
    ...opts,
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: true,
    ignoreRoute: (req, res) => {
      return false;
    }
  });
