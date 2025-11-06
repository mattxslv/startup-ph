import { Badge } from 'ui/components';
import { TStartUp } from '../startup';

type Props = {
  value: TStartUp['status'];
};

function StartupStatusBadge({ value }: Props) {
  // Convert to uppercase for consistent comparison
  const normalizedValue = value?.toUpperCase();
  
  if (normalizedValue === 'VERIFIED') 
    return <Badge variant="success" className="border-none min-h-min py-1 px-4 text-sm font-medium rounded-none rounded-l-sm inline-flex items-center justify-center">Verified</Badge>;
  if (normalizedValue === 'UNVERIFIED') return <Badge variant="base">Unverified</Badge>;
  if (normalizedValue === 'FOR VERIFICATION')
    return <Badge variant="warning" className="border-none min-h-min py-1 px-4 text-sm font-medium rounded-none rounded-l-sm inline-flex items-center justify-center">For Verification</Badge>;
  if (normalizedValue === 'FOR RESUBMISSION')
    return <Badge variant="info" className="border-none min-h-min py-1 px-4 text-sm font-medium rounded-none rounded-l-sm inline-flex items-center justify-center">For Resubmission</Badge>;
  if (normalizedValue === 'REJECTED') 
    return <Badge variant="danger" className="border-none min-h-min py-1 px-4 text-sm font-medium rounded-none rounded-l-sm inline-flex items-center justify-center">Rejected</Badge>;
  return <Badge variant="base">{value}</Badge>;
}

export default StartupStatusBadge;
