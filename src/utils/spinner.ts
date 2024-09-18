import ora from 'ora';

export const spinner = (text: string) => {
  const loader = ora().start();
  loader.text = text;
  loader.color = 'yellow';
  loader.spinner = 'simpleDots';
  return loader;
};
