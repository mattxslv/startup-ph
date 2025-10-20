import { Card, Title } from 'ui/components';
import { NavHeaderTitle } from 'components';
import PageContainer from 'layouts/PageContainer';
import { InvestorList } from 'features/investors';

type Props = {};

function RejectedPage({}: Props) {
  return (
    <>
      <NavHeaderTitle>
        <Title>Investors - Rejected</Title>
      </NavHeaderTitle>
      <PageContainer className="space-y-4">
        <Card className="flex-1 flex flex-col">
          <InvestorList status="Rejected" />
        </Card>
      </PageContainer>
    </>
  );
}

export default RejectedPage;
