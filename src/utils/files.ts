import { promises as fs } from 'fs';
import { spinner } from './spinner.js';
import { handleError } from './handle-error.js';

const checkAccess = async (filePath: string): Promise<void> => {
  const loader = spinner('Checking if file exists...');
  try {
    await fs.access(filePath);
    loader.succeed('XML File exists');
  } catch (err) {
    loader.stop();
    handleError(`Error: File not found at path: ${filePath}`, err);
  }
};

export { checkAccess };
