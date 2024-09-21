import symbols from 'log-symbols';
import chalk from 'chalk';

const info = symbols.info;
const error = chalk.redBright(symbols.error);
const warn = chalk.yellowBright(symbols.warning);
const success = symbols.success;

export { info, error, warn, success };
