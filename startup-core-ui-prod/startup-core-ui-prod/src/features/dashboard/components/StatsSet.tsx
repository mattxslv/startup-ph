import { useState } from 'react';
import { HiChartBar, HiPresentationChartLine } from 'react-icons/hi';
import { Bar, Chart, Line } from 'ui/chart';
import { Button, Card, FitContent, Table, TableColumn } from 'ui/components';

interface Props {
  label: string;
  chart: Array<{ label: string; count: number }>;
  defaultChartType?: TChartType;
  lineChart?: boolean;
  barChart?: boolean;
}

type TChartType = 'line' | 'bar';

function StatsSet({
  defaultChartType = 'line',
  label,
  chart = [],
  lineChart = true,
  barChart = true,
}: Props) {
  const [chartType, setChartType] = useState<TChartType>(defaultChartType);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="grid-cols-1 md:col-span-2">
        <div className="flex items-center justify-between min-h-[32px] mb-7">
          <div className="font-semibold text-sm">{label}</div>
          <div className="space-x-[-1px]">
            {lineChart ? (
              <Button
                className="rounded-r-none"
                variant={chartType === 'line' ? 'neutralPrimary' : 'base'}
                size="sm"
                onClick={() => {
                  setChartType('line');
                }}
              >
                <HiPresentationChartLine />
              </Button>
            ) : null}
            {barChart ? (
              <Button
                className="rounded-l-none"
                variant={chartType === 'bar' ? 'neutralPrimary' : 'base'}
                size="sm"
                onClick={() => {
                  setChartType('bar');
                }}
              >
                <HiChartBar />
              </Button>
            ) : null}
          </div>
        </div>
        <div>
          {chartType === 'line' ? (
            <Chart isLoading={false} data={chart} labelKey="label" aspect="4:3">
              <Line
                valueKey={(row: any) => row.count}
                label="Count"
                borderColor="#0036C5"
                backgroundColor="#0036C555"
              />
            </Chart>
          ) : null}
          {chartType === 'bar' ? (
            <Chart isLoading={false} data={chart} labelKey="label" aspect="4:3">
              <Bar
                valueKey={(row: any) => row.count}
                label="Count"
                borderColor="#0036C5"
                backgroundColor="#0036C555"
              />
            </Chart>
          ) : null}
        </div>
      </Card>
      <Card className="flex flex-col">
        <div className="flex items-center justify-between min-h-[32px] mb-7">
          <div className="font-semibold text-sm">{label}</div>
        </div>
        <div className="flex flex-col flex-grow min-h-[250px]">
          <FitContent>
            <Table data={chart}>
              <TableColumn id="label" label="Item" />
              <TableColumn
                id="count_human"
                label="Count"
                width="120px"
                className="text-right"
              />
            </Table>
          </FitContent>
        </div>
      </Card>
    </div>
  );
}

export default StatsSet;
