var winston = require('winston');
var Elasticsearch = require( 'winston-elasticsearch' );
winston.emitErrs = true;

var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'warn',
            filename: './logs/all-logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'warn',
            handleExceptions: true,
            json: false,
            colorize: true
        }),
        new Elasticsearch({ level: 'warn' })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};