import React from 'react';
import Badge from './Badge';

type Props = {
  list: string[];
};

function BadgeArray({ list }: Props) {
  return (
    <div className="-mb-1 flex flex-wrap">
      {React.Children.toArray(
        list.map((item: string) => (
          <Badge className="mb-1 mr-1" variant="primary">
            {item || '-'}
          </Badge>
        ))
      )}
    </div>
  );
}

export default BadgeArray;
