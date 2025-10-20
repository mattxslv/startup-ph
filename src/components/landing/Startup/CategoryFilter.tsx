import Button from '@/ui/button/Button';
import React, { useState } from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi';

type Props = {}

const useCategories = () => {
  const [data] = useState([
    'Artificial Intelligence',
    'Business',
    'Data & Analytics',
    'Development',
    'Finance',
    'Hardware',
    'Health & Fitness',
  ]);
  return data;
}

const FilterItem = ({ label, active }: {
  label: string
  active?: boolean
}) => {
  if (!active) return (
    <Button size="sm" variant="link">{label}</Button>
  )
  return (
    <Button className="rounded-full" size="sm" variant="outline">{label}</Button>
  )
}


function CategoryFilter({}: Props) {
  const categories = useCategories()
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <FilterItem label="All Startups" active />
      </div>
      <div className="flex-1 relative h-[42px]">
        <div className="absolute inset-0 h-full w-full overflow-auto no-scrollbar">
          <div className="flex whitespace-nowrap items-center">
            {categories.map((item) => (
              <FilterItem key={item} label={item} />
            ))}
          </div>
        </div>
      </div>
      <Button className="hidden md:inline-flex flex-shrink-0 text-primary" size="sm" variant="link" trailing={<BiDotsHorizontalRounded />}>
        More
      </Button>
    </div>
  )
}

export default CategoryFilter