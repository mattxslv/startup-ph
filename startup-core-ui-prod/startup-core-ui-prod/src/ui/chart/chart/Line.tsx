import { LineOptions } from 'chart.js';
import { IDataLabel } from '../types';

interface IProps extends Partial<LineOptions> {
  name?: string;
  valueKey: string | ((x: any) => number);
  label: string;
  datalabels?: IDataLabel;
}

function Line({ valueKey, label }: IProps) {
  return <div>Line</div>;
}

Line.defaultProps = {
  name: 'Line',
  datalabels: { color: '#0000' },
};

export default Line;
