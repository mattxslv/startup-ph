import { BarOptions } from 'chart.js';
import { IDataLabel } from '../types';

interface IProps extends Partial<BarOptions> {
  name?: string;
  valueKey: string | ((x: any) => number);
  label: string;
  datalabels?: IDataLabel;
}

function Bar({ valueKey, label }: IProps) {
  return <div>Bar</div>;
}

Bar.defaultProps = {
  name: 'Bar',
  datalabels: { color: '#0000' },
};

export default Bar;
