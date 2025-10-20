import { Card, Title } from 'ui/components';
import { NavHeaderTitle } from 'components';
import PageContainer from 'layouts/PageContainer';
import { InvestorList } from 'features/investors';

type Props = {};

function ApprovedPage({}: Props) {
  return (
    <>
      <NavHeaderTitle>
        <Title>Investors - Approved</Title>
      </NavHeaderTitle>
      <PageContainer className="space-y-4">
        <Card className="flex-1 flex flex-col">
          <InvestorList status="Approved" />
        </Card>
      </PageContainer>
    </>
  );
}

export default ApprovedPage;
