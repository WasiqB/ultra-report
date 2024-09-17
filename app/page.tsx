import { promises as fs } from 'fs';
import Report from './components/report-details';
import { TestNGReport } from '@/src/types';
import path from 'path';
import AutomatedTestCases from './components/automated-test-cases';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import Footer from './components/footer';

export default async function HomePage(): Promise<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> {
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
        <h1 className='text-3xl font-bold'>Ultra Report</h1>
      </header>

      <main className='container mx-auto p-8'>
        {!reportData ? (
          <div className='mt-8 w-full text-center'>
            <h2 className='text-xl font-semibold'>No Report Available</h2>
            <p className='text-gray-600'>
              No result file found on the provided path:
              <span className='pl-1 text-sm font-bold'>{reportFilePath}</span>
            </p>
          </div>
        ) : (
          <div className='flex flex-col'>
            <AutomatedTestCases reportData={reportData} />
            <Report reportData={reportData} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
