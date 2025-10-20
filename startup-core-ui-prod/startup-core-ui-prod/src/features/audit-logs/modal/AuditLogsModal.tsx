import { showModal } from 'context/modal';
import { Button, CodeSnippet, Info, ModalFooter } from 'ui/components';
import { IAuditLogs } from '../types';

export const showAuditLogsModal = (data: IAuditLogs) => {
  showModal({
    id: 'audit-logs',
    title: 'Logs',
    size: 'lg',
    component: AuditLogsModal,
    props: {
      data,
    },
  });
};

interface Props {
  data: IAuditLogs;
  onClose: () => void;
}

function AuditLogsModal({ data, onClose }: Props) {
  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-4">
          <Info label="Timestamp">{data.created_at}</Info>
          <Info label="User">{data.user_name}</Info>
          <Info label="Event">{data.event}</Info>
          <Info label="Module">{data.auditable_type}</Info>
        </div>
        <div className="text-xs space-y-4">
          {data.old_values ? (
            <CodeSnippet label="Old Value" value={data?.old_values} />
          ) : null}
          {data.new_values ? (
            <CodeSnippet label="New Value" value={data?.new_values} />
          ) : null}
        </div>
      </div>
      <ModalFooter>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </>
  );
}

export default AuditLogsModal;
