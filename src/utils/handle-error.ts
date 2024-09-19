import { logger } from './logger.js';
import chalk from 'chalk';

export const handleError = (
  message: string,
  error: unknown,
  printStack: boolean = false
): void => {
  logger.error(chalk.red(message));
  logger.break();
  if (typeof error === 'string') {
    logger.log(chalk.red(error));
  } else if (error instanceof Error) {
    logger.log(chalk.red(`Message: ${error.name} - ${error.message}`));
    if (error.cause) {
      logger.log(chalk.red(`Caused By: ${error.cause}`));
    }
    if (printStack) {
      logger.log(chalk.red(`Stacktrace: ${error.stack}`));
    }
  }
  logger.break();
  logger.info(
    chalk.blueBright(
      'If you feel the issue is related to the report, please open an issue on GitHub 👇'
    )
  );
  logger.log(
    chalk.blueBright('🔗 https://github.com/WasiqB/ultra-report/issues/new')
  );
  process.exit(1);
};
