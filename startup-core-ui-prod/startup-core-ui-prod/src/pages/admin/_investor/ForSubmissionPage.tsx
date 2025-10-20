import { Card, Title } from 'ui/components';
import { NavHeaderTitle } from 'components';
import PageContainer from 'layouts/PageContainer';
import { InvestorList } from 'features/investors';

type Props = {};

function ForSubmissionPage({}: Props) {
  return (
    <>
      <NavHeaderTitle>
        <Title>Investors - For Requirements Submisssion</Title>
      </NavHeaderTitle>
      <PageContainer className="space-y-4">
        <Card className="flex-1 flex flex-col">
          <InvestorList status="For Requirements Submission" />
        </Card>
      </PageContainer>
    </>
  );
}

export default ForSubmissionPage;
