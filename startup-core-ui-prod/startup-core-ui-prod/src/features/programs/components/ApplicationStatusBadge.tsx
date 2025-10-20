import React from 'react';
import { IApplication } from '../types';
import { Badge } from 'ui/components';

type Props = {
  value: IApplication['status'];
};

function ApplicationStatusBadge({ value }: Props) {
  if (value === 'FOR ASSESSMENT')
    return (
      <Badge rounded variant="warning">
        {value}
      </Badge>
    );
  if (value === 'FOR RESUBMISSION')
    return (
      <Badge rounded variant="info">
        {value}
      </Badge>
    );
  if (value === 'REJECTED')
    return (
      <Badge rounded variant="danger">
        {value}
      </Badge>
    );
  if (value === 'APPROVED')
    return (
      <Badge rounded variant="success">
        {value}
      </Badge>
    );
  return (
    <Badge rounded variant="base">
      {value}
    </Badge>
  );
}

export default ApplicationStatusBadge;
