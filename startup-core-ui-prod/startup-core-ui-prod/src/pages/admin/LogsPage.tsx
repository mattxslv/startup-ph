import { NavHeaderTitle } from 'components';
import { AuditLogsList } from 'features/audit-logs';
import PageContainer from 'layouts/PageContainer';
import { Card, Title } from 'ui/components';

function LogsPage() {
  return (
    <>
      <NavHeaderTitle>
        <Title>Audit Logs</Title>
      </NavHeaderTitle>
      <PageContainer className="space-y-4">
        <Card className="flex-1 flex flex-col">
          <AuditLogsList />
        </Card>
      </PageContainer>
    </>
  );
}

export default LogsPage;
