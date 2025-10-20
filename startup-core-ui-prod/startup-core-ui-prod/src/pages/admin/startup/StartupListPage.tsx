import { NavHeaderTitle } from 'components';
import { StartUps } from 'features/startup';
import { useParams } from 'react-router-dom';
import { Title } from 'ui/components';

function StartupListPage() {
  const { type } = useParams() as TStartupParams;

  return (
    <>
      <NavHeaderTitle>
        <Title>
          StartUps {type === 'for-verification' && '- For Verification'}
        </Title>
      </NavHeaderTitle>
      <div className="w-full p-4 mx-auto flex-1 flex flex-col">
        <StartUps />
      </div>
    </>
  );
}

export default StartupListPage;
