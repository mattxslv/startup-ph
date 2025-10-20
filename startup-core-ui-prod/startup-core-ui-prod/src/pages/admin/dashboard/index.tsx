import { NavHeaderTitle } from 'components';
import { Dashboard } from 'features/dashboard';
import PageContainer from 'layouts/PageContainer';
import { Title } from 'ui/components';

function DashboardPage() {
  return (
    <>
      <NavHeaderTitle>
        <Title>Dashboard</Title>
      </NavHeaderTitle>
      <PageContainer>
        <Dashboard />
      </PageContainer>
    </>
  );
}

export default DashboardPage;
