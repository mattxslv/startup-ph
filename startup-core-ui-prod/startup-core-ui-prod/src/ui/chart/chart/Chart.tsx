import { useMemo } from 'react';
import {
  Chart as ChartJS,
  ChartData,
  ChartDataset,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart as ReactChartJs } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { omit } from 'lodash';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  ChartDataLabels
);

interface IProps<T> {
  isLoading: boolean;
  data: T[];
  children: any;
  labelKey?: string | ((v: T) => string);
  aspect?: string;
}

const MAP_TYPE_BY_COMPONENT: Record<string, 'bar' | 'line' | undefined> = {
  Bar: 'bar',
  Line: 'line',
};

function formatDataset<T>(
  raw: T[],
  v: any
): ChartDataset<'bar' | 'line', number[]> {
  const data = raw.map((item) => {
    const valueKey = v.props.valueKey as string | ((v: T) => number);
    if (typeof valueKey === 'function') return valueKey(item);
    return item[valueKey as keyof T] as number;
  });
  return {
    type: MAP_TYPE_BY_COMPONENT[v?.props?.name],
    label: v?.props?.label,
    ...omit(v.props, ['label', 'valueKey']),
    data,
  };
}

function buildDataset<T>(
  children: any,
  data: T[]
): Array<ChartDataset<'bar' | 'line', number[]>> {
  const dataset = [];
  if (Array.isArray(children))
    children.map((child) => dataset.push(formatDataset<T>(data, child)));
  if (!Array.isArray(children)) dataset.push(formatDataset<T>(data, children));
  return dataset;
}

function Chart<T = unknown>({
  isLoading,
  data,
  children,
  labelKey,
  aspect,
}: IProps<T>) {
  const formatted = useMemo((): ChartData<
    'bar' | 'line',
    number[],
    unknown
  > => {
    return {
      labels: data.map((r) => {
        if (typeof labelKey === 'function') return labelKey(r);
        return r[labelKey as keyof T];
      }),
      datasets: buildDataset<T>(children, data),
    };
  }, [data, labelKey, children]);

  const computedAspect = useMemo(() => {
    if (!aspect) return {};
    const [aw, ah] = aspect.split(':');
    const ratio = +ah / +aw;
    return {
      height: +ah * ratio * 1000,
      width: +aw * 1000,
    };
  }, [aspect]);

  return <ReactChartJs type="bar" data={formatted} {...computedAspect} />;
}

export default Chart;
