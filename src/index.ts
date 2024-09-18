import { promises as fs } from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { parseStringPromise } from 'xml2js';
import { TestCase, TestNGReport, TestSuite } from './types';
import { logger } from './utils/logger.js';
import { checkAccess } from './utils/files.js';
import { spinner } from './utils/spinner.js';
import { handleError } from './utils/handle-error.js';

const mapToTestNGReport = (jsonData: any): TestNGReport => {
  const testsuite = jsonData.testsuite;

  const mappedTestSuite: TestSuite = {
    ignored: parseInt(testsuite.ignored || '0', 10),
    hostname: testsuite.hostname,
    failures: parseInt(testsuite.failures, 10),
    tests: parseInt(testsuite.tests, 10),
    name: testsuite.name,
    time: parseFloat(testsuite.time),
    errors: parseInt(testsuite.errors, 10),
    timestamp: testsuite.timestamp,
    testcase: testsuite.testcase.map((testcase: any): TestCase => {
      const mappedTestCase: TestCase = {
        classname: testcase.classname,
        name: testcase.name,
        time: parseFloat(testcase.time),
      };

      if (testcase.failure) {
        mappedTestCase.failure = {
          type: testcase.failure.type,
          message: testcase.failure.message,
          details: testcase.failure._,
        };
      }

      if (testcase.skipped === '') {
        mappedTestCase.skipped = {};
      }

      if (testcase.ignored === '') {
        mappedTestCase.ignored = {};
      }

      return mappedTestCase;
    }),
  };

  return { testsuite: mappedTestSuite };
};

const generateReport = async (filePath: string): Promise<void> => {
  const fullPath = path.resolve(filePath);
  const outputDir = path.resolve('public/results');
  await checkAccess(fullPath);
  await generateJson(fullPath, outputDir);
  buildReport();
};

const printInfo = (outputDir: string) => {
  logger.info(`You can find the report at "${path.resolve(outputDir)}"`);
  logger.break();
  logger.info('Read the docs at: https://github.com/WasiqB/ultra-report');
};

const buildReport = (): void => {
  const loader = spinner('Building and generating report...');

  exec('pnpm build', (err) => {
    if (err) {
      loader.stop();
      handleError('Error during build/export', err);
    }
    loader.succeed('Report generated successfully!');
    printInfo('out/index.html');
  });
};

const generateJson = async (
  filePath: string,
  outputDir: string
): Promise<void> => {
  const loader = spinner('Parsing XML file to JSON...');
  try {
    const xmlData = await fs.readFile(filePath, 'utf-8');

    const jsonData = await parseStringPromise(xmlData, {
      explicitArray: false,
      mergeAttrs: true,
    });

    const testNGReport = mapToTestNGReport(jsonData);

    await fs.mkdir(outputDir, { recursive: true });

    const outputPath = path.join(outputDir, 'results.json');
    await fs.writeFile(outputPath, JSON.stringify(testNGReport, null, 2));
    loader.succeed(`Parsed XML data written to', ${outputDir}`);
  } catch (err) {
    loader.stop();
    handleError('Error while generating JSON from XML', err);
  }
};

const xmlFilePath = process.argv[2];
if (!xmlFilePath) {
  logger.error('Usage: ts-node generate-report.ts <path-to-xml-file>');
  process.exit(1);
}

generateReport(xmlFilePath);
