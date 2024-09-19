'use client';

import * as React from 'react';
import { ChartConfig } from '@/components/ui/chart';
import { TestNGReport } from '@/src/types';
import DoughNutComponent from '@/components/dough-nut-chart';
import StatCounter from '@/components/stat';

interface TestCasesProps {
  reportData: TestNGReport;
}

const chartConfig: ChartConfig = {
  total: {
    label: 'Test Cases',
  },
  pass: {
    label: 'Passes',
    color: 'hsl(var(--passed))',
  },
  fail: {
    label: 'Failed',
    color: 'hsl(var(--failed))',
  },
  skip: {
    label: 'Skipped',
    color: 'hsl(var(--skipped))',
  },
  ignored: {
    label: 'Ignored',
    color: 'hsl(var(--ignored))',
  },
};

const AutomatedTestCases = ({ reportData }: TestCasesProps): JSX.Element => {
  const skippedCases = reportData.testsuite.testcase.filter(
    (test) => test.skipped
  ).length;
  const { tests, failures, ignored } = reportData.testsuite;
  const passedCases = tests - failures - ignored - skippedCases;
  const chartData = [
    { status: 'pass', total: passedCases, fill: 'var(--color-pass)' },
    { status: 'fail', total: failures, fill: 'var(--color-fail)' },
    { status: 'skip', total: skippedCases, fill: 'var(--color-skip)' },
    { status: 'ignored', total: ignored, fill: 'var(--color-ignored)' },
  ];

  const totalCases = tests;
  return (
    <div className='flex w-full flex-col place-items-center'>
      <div className='flex-5 flex justify-evenly'>
        <StatCounter title='Total Test cases' value={totalCases} />
        <StatCounter title='Passed' value={passedCases} />
        <StatCounter title='Failed' value={failures} />
        <StatCounter title='Skipped' value={skippedCases} />
        <StatCounter title='Ignored' value={ignored} />
        <StatCounter
          title='Time Taken'
          value={reportData.testsuite.time}
          time
        />
      </div>
      <DoughNutComponent
        title='Test Summary'
        description='Status based distribution of Automated Test cases result'
        config={chartConfig}
        data={chartData}
        totalValue={totalCases}
        valueLabel='Test cases'
        footer='Showing total executed tests for the last test execution'
      />
    </div>
  );
};

export default AutomatedTestCases;
