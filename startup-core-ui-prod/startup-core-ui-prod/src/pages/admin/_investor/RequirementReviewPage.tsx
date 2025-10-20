import { Card, Title } from 'ui/components';
import { NavHeaderTitle } from 'components';
import PageContainer from 'layouts/PageContainer';
import { InvestorList } from 'features/investors';

type Props = {};

function RequirementReviewPage({}: Props) {
  return (
    <>
      <NavHeaderTitle>
        <Title>Investors - Requirement Review</Title>
      </NavHeaderTitle>
      <PageContainer className="space-y-4">
        <Card className="flex-1 flex flex-col">
          <InvestorList status="For Requirements Review" />
        </Card>
      </PageContainer>
    </>
  );
}

export default RequirementReviewPage;
