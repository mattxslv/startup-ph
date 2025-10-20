import { NavHeaderTitle } from 'components';
import { RequirementsList } from 'features/cms-requirements';
import PageContainer from 'layouts/PageContainer';
import { Card, Title } from 'ui/components';

function RequirementPage() {
  return (
    <>
      <NavHeaderTitle>
        <Title>Requirements</Title>
      </NavHeaderTitle>
      <PageContainer className="space-y-4">
        <Card className="flex-1 flex flex-col">
          <RequirementsList />
        </Card>
      </PageContainer>
    </>
  );
}

export default RequirementPage;
