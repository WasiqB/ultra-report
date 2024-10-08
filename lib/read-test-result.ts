/* eslint-disable @typescript-eslint/no-require-imports */
export const readTestReport = (fileName: string): any => {
  if (typeof window === 'undefined') {
    const fs = require('fs');
    const path = require('path');

    const filePath = path.join(process.cwd(), 'public/results', fileName);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  }
};
