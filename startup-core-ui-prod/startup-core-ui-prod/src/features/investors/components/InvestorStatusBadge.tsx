import { Badge } from 'ui/components';
import { TInvestorStatus } from '../types';

type Props = {
  value?: TInvestorStatus;
};

function InvestorStatusBadge({ value }: Props) {
  if (value === 'For Review')
    return <Badge variant="warning">For Review</Badge>;
  if (value === 'For Requirements Submission')
    return <Badge variant="warning">For Requirements Submission</Badge>;
  if (value === 'For Requirements Review')
    return <Badge variant="warning">For Requirement Review</Badge>;
  if (value === 'Approved') return <Badge variant="success">Approved</Badge>;
  if (value === 'Rejected') return <Badge variant="danger">Rejected</Badge>;
  return <Badge variant="base">{value}</Badge>;
}

export default InvestorStatusBadge;
