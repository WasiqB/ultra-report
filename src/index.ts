import { promises as fs } from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { parseStringPromise } from 'xml2js';
import { TestCase, TestNGReport, TestSuite } from './types';

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

const generateReport = async (xmlFilePath: string) => {
  const fullPath = path.resolve(xmlFilePath);

  try {
    await fs.access(fullPath);
  } catch (error) {
    console.error('Error: XML file not found at path:', fullPath);
    process.exit(1);
  }

  const xmlData = await fs.readFile(fullPath, 'utf-8');

  try {
    const jsonData = await parseStringPromise(xmlData, {
      explicitArray: false,
      mergeAttrs: true,
    });

    const testNGReport = mapToTestNGReport(jsonData);

    const outputDir = path.resolve('public/results');
    await fs.mkdir(outputDir, { recursive: true });

    const outputPath = path.join(outputDir, 'results.json');
    await fs.writeFile(outputPath, JSON.stringify(testNGReport, null, 2));

    console.log('Parsed XML data written to', outputPath);

    exec('pnpm run build', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error during build/export: ${error}`);
        process.exit(1);
      }
      console.log('Report generated successfully!');
      console.log('You can find the report in the "out" directory.');
    });
  } catch (err) {
    console.error('Error parsing XML:', err);
    process.exit(1);
  }
};

const xmlFilePath = process.argv[2];
if (!xmlFilePath) {
  console.error('Usage: ts-node generate-report.ts <path-to-xml-file>');
  process.exit(1);
}

generateReport(xmlFilePath);
