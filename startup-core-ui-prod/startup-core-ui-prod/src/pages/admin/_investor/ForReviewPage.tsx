import { Card, Title } from 'ui/components';
import { NavHeaderTitle } from 'components';
import PageContainer from 'layouts/PageContainer';
import { InvestorList } from 'features/investors';

type Props = {};

function ForReviewPage({}: Props) {
  return (
    <>
      <NavHeaderTitle>
        <Title>Investors - For Review</Title>
      </NavHeaderTitle>
      <PageContainer className="space-y-4">
        <Card className="flex-1 flex flex-col">
          <InvestorList status="For Review" />
        </Card>
      </PageContainer>
    </>
  );
}

export default ForReviewPage;
