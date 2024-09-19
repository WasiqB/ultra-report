import ora, { Ora } from 'ora';

export const spinner = (text: string): Ora => {
  const loader = ora().start();
  loader.text = text;
  loader.color = 'yellow';
  loader.spinner = 'simpleDots';
  return loader;
};
