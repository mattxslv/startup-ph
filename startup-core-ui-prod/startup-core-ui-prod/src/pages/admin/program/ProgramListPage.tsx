import { NavHeaderTitle } from 'components';
import { Programs } from 'features/programs';
import { Title } from 'ui/components';

function ProgramListPage() {
  return (
    <>
      <NavHeaderTitle>
        <Title>Programs</Title>
      </NavHeaderTitle>
      <div className="w-full p-4 mx-auto flex-1 flex flex-col">
        <Programs />
      </div>
    </>
  );
}

export default ProgramListPage;
