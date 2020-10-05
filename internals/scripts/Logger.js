const {createLogger,format,transports, config} = require('winston');
const {combine,timestamp,json,printf,splat } = format;
require('winston-daily-rotate-file');
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue',
  },
};
//1024 * 1024 * 10 = 1024 bytes(1kb) * 1024 (1mb) * 19 = (1kb x 1mb ) * 10 = 10mb
const options = {
  file: {
    level: 'info',
    levels: customLevels.levels,
    filename: './internals/data/reports-%DATE%.log',
    handleExceptions: false,
    maxsize: '10m', //5mb
    zippedArchive: true,
    handleExceptions: true,
    maxFiles: '7d',
    colorize: true,
  },
  console: {
    level: 'debug',
    levels: customLevels.levels,
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const costumFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let data = [];
  let dataObj = {
    time: timestamp,
    level: level,
    message,
    ...metadata,
  };

  if (metadata) {
    let jsondam = JSON.stringify(dataObj);
    data.push(jsondam);
  }

  return data;
});

const Logger = createLogger({
  exitOnError: false,
  format: combine(
    splat(),
    timestamp({ format: 'YY-MM-DD h:mm a' }),
    json(),
    costumFormat
  ),
  transports: [
    new transports.Console(options.console),
    new transports.DailyRotateFile(options.file),
  ],
});
const InfoLog = createLogger({
  exitOnError: false,
  format: combine(timestamp({ format: 'h:mm:s a' })),
});

const ClearLog = () => {
 
}


module.exports = Logger;