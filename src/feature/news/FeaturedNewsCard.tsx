import React from 'react'
import { useFeaturedNewsList } from './useNews';
import NewsCard from './NewsCard';
import Button from '@/ui/button/Button';
import { useRouter } from 'next/router';

type Props = {}

function FeaturedNewsCard({}: Props) {
  const router = useRouter();
  const { data } = useFeaturedNewsList({ per_page: 3, 'tags[]': 'Featured' });
  return (
    <div>
      <div className="flex snap-x overflow-auto no-scrollbar -mx-3 mb-10">
        {(data?.list || []).map((item) => (
          <div className="w-10/12 md:w-1/3 px-3 snap-center flex-shrink-0" key={item.id}>
            <NewsCard
              data={item}
              truncateTitle
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Button variant="dark" onClick={() => {
          router.push('/news')
        }}>View All</Button>
      </div>
    </div>
  )
}

export default FeaturedNewsCard