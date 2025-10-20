import { NavHeaderTitle } from 'components';
import { News } from 'features/news';
import { Title } from 'ui/components';

function NewsPage() {
  return (
    <>
      <NavHeaderTitle>
        <Title>News</Title>
      </NavHeaderTitle>
      <div className="w-full p-4 mx-auto flex-1 flex flex-col">
        <News />
      </div>
    </>
  );
}

export default NewsPage;
