import { promises as fs } from 'fs';
import Report from '@/components/report';
import { TestNGReport } from '@/src/types';
import path from 'path';

export default async function HomePage() {
  const reportFilePath = path.join(
    process.cwd(),
    'public/results',
    'results.json'
  );

  console.log(reportFilePath);

  let reportData: TestNGReport | null = null;

  try {
    const fileContents = await fs.readFile(reportFilePath, 'utf-8');
    reportData = JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading report file:', error);
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-blue-600 p-6 text-center text-white'>
        <h1 className='text-3xl font-bold'>Test Automation Report</h1>
      </header>

      <main className='container mx-auto p-8'>
        {!reportData ? (
          <div className='mt-8 text-center'>
            <h2 className='text-xl font-semibold'>No Report Available</h2>
            <p className='text-gray-600'>
              Please upload or generate a test report.
            </p>
          </div>
        ) : (
          <Report reportData={reportData} />
        )}
      </main>

      <footer className='mt-auto bg-blue-600 p-4 text-center text-white'>
        <p className='text-sm'>
          &copy; 2024 Boyka Framework. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
