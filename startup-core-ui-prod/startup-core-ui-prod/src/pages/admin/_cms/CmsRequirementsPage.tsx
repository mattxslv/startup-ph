import { Card, Title } from 'ui/components';
import { NavHeaderTitle } from 'components';
import PageContainer from 'layouts/PageContainer';
import { RequirementsList } from 'features/cms-requirements';

type Props = {};

function CmsRequirementsPage({}: Props) {
  return (
    <>
      <NavHeaderTitle>
        <Title>CMS - Requirements</Title>
      </NavHeaderTitle>
      <PageContainer className="space-y-4">
        <Card className="flex-1 flex flex-col">
          <RequirementsList />
        </Card>
      </PageContainer>
    </>
  );
}

export default CmsRequirementsPage;
