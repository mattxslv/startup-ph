import { showModal } from 'context/modal';
import { Badge, Button, CodeSnippet, Info, ModalFooter } from 'ui/components';
import { ILogs } from '../types';

export const showLogsModal = (data: ILogs) => {
  showModal({
    id: 'log-details',
    title: 'Integration Log Details',
    component: LogsModal,
    props: {
      data,
    },
  });
};

interface Props {
  data: ILogs;
  onClose: () => void;
}

function LogsModal({ data, onClose }: Props) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Info label="Created At">{data.created_at}</Info>
        <Info label="Partner Name">{data.partner_name}</Info>
        <Info label="With Hit">
          {data.with_hit ? (
            <Badge variant="danger">With Hit</Badge>
          ) : (
            <Badge variant="success">No Hit</Badge>
          )}
        </Info>
        <Info label="With Count">{data.hit_count}</Info>
        <div className="col-span-2">
          <CodeSnippet label="Query" value={JSON.stringify(data.query)} />
        </div>
        <div className="col-span-2">
          <Info label="Hits">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="border">Ref No.</th>
                  <th className="border">Name</th>
                  <th className="border">Birth Date</th>
                  <th className="border">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {data.hits.length < 1 ? (
                  <tr>
                    <td className="border text-center" colSpan={4}>
                      There are no items.
                    </td>
                  </tr>
                ) : (
                  data.hits.map((row) => (
                    <tr key={row.id}>
                      <td className="border">{row.reference}</td>
                      <td className="border">{row.fullname}</td>
                      <td className="border">{row.birth_date}</td>
                      <td className="border text-right">
                        <a
                          className="font-semibold underline text-primary-base"
                          href="/"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log('show Details', row);
                          }}
                        >
                          View Details
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Info>
        </div>
      </div>
      <ModalFooter>
        <Button onClick={onClose}>Close</Button>
      </ModalFooter>
    </>
  );
}

export default LogsModal;
