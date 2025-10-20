import { OverrideList } from 'features/override';
import PageContainer from 'layouts/PageContainer';
import { Card } from 'ui/components';

function OverridePage() {
  return (
    <PageContainer className="space-y-4">
      <Card className="flex-1 flex flex-col">
        <OverrideList />
      </Card>
    </PageContainer>
  );
}

export default OverridePage;
