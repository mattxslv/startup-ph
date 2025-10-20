import { NavHeaderTitle } from 'components';
import { Resources } from 'features/resources';
import { Title } from 'ui/components';

function ResourcesPage() {
  return (
    <>
      <NavHeaderTitle>
        <Title>Resources</Title>
      </NavHeaderTitle>
      <div className="w-full p-4 mx-auto flex-1 flex flex-col">
        <Resources />
      </div>
    </>
  );
}

export default ResourcesPage;
