'use client';

import { FC } from 'react';
import { TestNGReport } from '@/src/types';
import { GetServerSideProps } from 'next';

interface ReportProps {
  reportData: TestNGReport;
}

export const getServerSideProps: GetServerSideProps<ReportProps> = async () => {
  const { readTestReport } = await import('@/lib/read-test-result');

  const reportData = readTestReport('results.json');

  return {
    props: {
      reportData,
    },
  };
};

const Report: FC<ReportProps> = ({ reportData }) => {
  const { testsuite } = reportData;

  return (
    <div className='container mx-auto p-8'>
      <div className='mt-8'>
        <h2 className='text-2xl font-semibold'>Test Case Details</h2>
        <div className='mt-4'>
          {testsuite.testcase.map((test, index) => (
            <div
              key={index}
              className='mb-4 rounded-md border border-gray-300 p-4'
            >
              <h3 className='text-xl font-medium'>{test.name}</h3>
              <p className='text-gray-600'>
                <strong>Class:</strong> {test.classname}
              </p>
              <p className='text-gray-600'>
                <strong>Execution Time:</strong> {test.time} seconds
              </p>

              {!test.ignored && !test.failure && !test.skipped && (
                <div className='mt-4 rounded-md border border-gray-300 bg-gray-100 p-4'>
                  <h4 className='font-semibold text-green-500'>Test Passed</h4>
                </div>
              )}

              {test.failure && (
                <>
                  <div className='mt-4 rounded-md border border-gray-300 bg-gray-100 p-4'>
                    <h4 className='font-semibold text-red-500'>Test Failed</h4>
                  </div>
                  <div className='mt-4 rounded-md border border-red-300 bg-red-100 p-4'>
                    <h4 className='font-semibold text-red-600'>
                      Failure Details:
                    </h4>
                    <p>
                      <strong>Type:</strong> {test.failure.type}
                    </p>
                    <p>
                      <strong>Message:</strong> {test.failure.message}
                    </p>
                    <pre className='mt-2 overflow-auto rounded-md bg-gray-100 p-2'>
                      {test.failure.details}
                    </pre>
                  </div>
                </>
              )}

              {test.skipped && (
                <div className='mt-4 rounded-md border border-yellow-300 bg-yellow-100 p-4'>
                  <h4 className='font-semibold text-yellow-600'>
                    Test Skipped
                  </h4>
                </div>
              )}

              {test.ignored && (
                <div className='mt-4 rounded-md border border-gray-300 bg-gray-100 p-4'>
                  <h4 className='font-semibold text-gray-600'>Test Ignored</h4>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Report;
