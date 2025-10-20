import { NavHeaderTitle } from 'components';
import { ForVerificationList } from 'features/startup';
import PageContainer from 'layouts/PageContainer';
import { Card, Title } from 'ui/components';

function ForVerificationListPage() {
  return (
    <>
      <NavHeaderTitle>
        <Title>StartUp - For Verification</Title>
      </NavHeaderTitle>
      <PageContainer className="space-y-4">
        <Card className="flex-1 flex flex-col">
          <ForVerificationList />
        </Card>
      </PageContainer>
    </>
  );
}

export default ForVerificationListPage;
