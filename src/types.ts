export type TestSuite = {
  ignored: number;
  hostname: string;
  failures: number;
  tests: number;
  name: string;
  time: number;
  errors: number;
  timestamp: string;
  testcase: TestCase[];
};

export type TestCase = {
  classname: string;
  name: string;
  time: number;
  failure?: Failure;
  skipped?: Skipped;
  ignored?: Ignored;
};

type Failure = {
  type: string;
  message: string;
  details: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Skipped = {};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Ignored = {};

export type TestNGReport = {
  testsuite: TestSuite;
};
