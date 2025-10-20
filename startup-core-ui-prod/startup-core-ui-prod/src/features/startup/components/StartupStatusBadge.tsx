import { Badge } from 'ui/components';
import { TStartUp } from '../startup';

type Props = {
  value: TStartUp['status'];
};

function StartupStatusBadge({ value }: Props) {
  if (value === 'VERIFIED') return <Badge variant="success">Verified</Badge>;
  if (value === 'UNVERIFIED') return <Badge variant="base">Unverified</Badge>;
  if (value === 'FOR VERIFICATION')
    return <Badge variant="warning">For Verification</Badge>;
  if (value === 'FOR RESUBMISSION')
    return <Badge variant="warning">For Resubmission</Badge>;
  if (value === 'REJECTED') return <Badge variant="warning">Rejected</Badge>;
  return <Badge variant="base">{value}</Badge>;
}

export default StartupStatusBadge;
