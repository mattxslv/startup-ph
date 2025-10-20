import React from 'react';
import { Badge } from 'ui/components';

type Props = {
  value: 'ACTIVE' | 'INACTIVE';
};

function ActiveBadge({ value }: Props) {
  if (value === 'ACTIVE') return <Badge variant="success">Active</Badge>;
  return <Badge variant="warning">Inactive</Badge>;
}

export default ActiveBadge;
