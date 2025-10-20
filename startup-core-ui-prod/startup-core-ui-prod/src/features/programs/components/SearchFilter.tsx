import useDebounceEffect from 'hooks/useDebounceEffect';
import React, { useState } from 'react';

interface Props {
  onChange: (filter: any) => void;
}

const SearchFilter = ({ onChange }: Props) => {
  const [filter, setFilter] = useState({ per_page: 1000, q: '' });
  useDebounceEffect(onChange, filter);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, q: e.target.value });
  };
  return (
    <input
      placeholder="Search here..."
      type="text"
      className="form-input h-10 rounded text-sm leading-4 placeholder:text-placeholder focus:ring-outline-active focus:ring-2 focus:border-transparent w-1/3"
      onChange={handleChange}
      value={filter.q}
    />
  );
};

export default SearchFilter;
