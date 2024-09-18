import { error, info, success, warn } from './marker.js';

export const logger = {
  log: (...args: unknown[]) => console.log(args.join(' ')),
  break: () => console.log(''),
  info: (...args: unknown[]) => console.log(info, args.join(' ')),
  warn: (...args: unknown[]) => console.log(warn, args.join(' ')),
  error: (...args: unknown[]) => console.log(error, args.join(' ')),
  success: (...args: unknown[]) => console.log(success, args.join(' ')),
};
