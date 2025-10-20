import React from "react";
import Badge from "./Badge";

type Props = {
  list: string[];
};

function BadgeArray({ list }: Props) {
  return (
    <div className="flex flex-wrap -mb-1 truncate">
      {list.length < 1 ? (
        <Badge className="mb-1 mr-1" variant="primary">
          none
        </Badge>
      ) : (
        list.map((x: string) => (
          <Badge className="mb-1 mr-1" variant="primary" key={x}>
            {x}
          </Badge>
        ))
      )}
    </div>
  );
}

export default BadgeArray;
