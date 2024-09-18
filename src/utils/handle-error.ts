import { logger } from './logger.js';

export const handleError = (
  message: string,
  error: unknown,
  printStack: boolean = false
) => {
  logger.error(message);
  logger.info('If the issue is not resolved, please open an issue on GitHub:');
  logger.log('https://github.com/WasiqB/ultra-report');
  logger.break();
  if (typeof error === 'string') {
    logger.log(error);
  } else if (error instanceof Error) {
    logger.log(`Message: ${error.name} - ${error.message}`);
    if (error.cause) {
      logger.log(`Caused By: ${error.cause}`);
    }
    if (printStack) {
      logger.log(`Stacktrace: ${error.stack}`);
    }
  }
  process.exit(1);
};
