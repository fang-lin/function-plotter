import moment from 'moment';

enum LogLevel {
    'OFF',
    'ERROR',
    'WARN',
    'INFO',
    'DEBUG',
    'TRACE',
    'ALL'
}

enum LogLevelColor {
    'ERROR' = 'Crimson',
    'WARN' = 'DarkOrange',
    'INFO' = 'OliveDrab',
    'DEBUG' = 'SteelBlue',
    'TRACE' = 'CadetBlue',
}

class Logger {
    public level: LogLevel;

    constructor(logLevel: LogLevel = LogLevel.ALL) {
        this.level = logLevel;
    }

    trace(message?: any, ...optionalParams: any[]): void {
        if (this.level >= LogLevel.TRACE) {
            console.trace(
                `%c ${moment().format()} TRACE `,
                `background-color: ${LogLevelColor.TRACE}; color: white`,
                message, ...optionalParams);
        }
    }

    debug(message?: any, ...optionalParams: any[]): void {
        if (this.level >= LogLevel.DEBUG) {
            console.log(
                `%c ${moment().format()} DEBUG `,
                `background-color: ${LogLevelColor.DEBUG}; color: white`,
                message, ...optionalParams);
        }
    }

    info(message?: any, ...optionalParams: any[]): void {
        if (this.level >= LogLevel.INFO) {
            console.info(
                `%c ${moment().format()} INFO `,
                `background-color: ${LogLevelColor.INFO}; color: white`,
                message, ...optionalParams);
        }
    }

    warn(message?: any, ...optionalParams: any[]): void {
        if (this.level >= LogLevel.WARN) {
            console.warn(
                `%c ${moment().format()} WARN `,
                `background-color: ${LogLevelColor.WARN}; color: white`,
                message, ...optionalParams);
        }
    }

    error(message?: any, ...optionalParams: any[]): void {
        if (this.level >= LogLevel.ERROR) {
            console.error(
                `%c ${moment().format()} ERROR `,
                `background-color: ${LogLevelColor.ERROR}; color: white`,
                message, ...optionalParams);
        }
    }
}

export const logger = new Logger(LogLevel.ALL);
