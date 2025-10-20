import { NavHeaderTitle } from 'components';
import AssessmentTagList from 'features/cms-assessment-tags/components/AssessmentTagList';
import PageContainer from 'layouts/PageContainer';
import { Card, Title } from 'ui/components';

function AssessmentTagsPage() {
  return (
    <>
      <NavHeaderTitle>
        <Title>Assessment Tags</Title>
      </NavHeaderTitle>
      <PageContainer>
        <Card className="flex-1 flex flex-col">
          <AssessmentTagList />
        </Card>
      </PageContainer>
    </>
  );
}

export default AssessmentTagsPage;
