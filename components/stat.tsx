import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface StatProps {
  title: string;
  value: number;
  time?: boolean;
}

const StatCounter = ({
  title,
  value,
  time = false,
}: StatProps): JSX.Element => {
  return (
    <Card className='m-2 pr-1 shadow-md'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-xl font-medium'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex items-end text-2xl font-bold'>
          {value.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
          {time && <p className='pl-1 text-sm'> secs</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCounter;
