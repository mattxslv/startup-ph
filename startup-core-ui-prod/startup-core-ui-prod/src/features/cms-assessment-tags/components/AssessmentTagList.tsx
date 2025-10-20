import {
  Button,
  FitContent,
  Pagination,
  Table,
  TableColumn,
} from 'ui/components';
import DatasetFilter, {
  INIT_FILTER_STATE,
} from '../../cms-dataset/components/DatasetFilter';
import { useState } from 'react';
import useAssessmentTagList from '../hooks/useAssessmentTagsList';
import { showAssessmentTagsModal } from '../modal/AssessmentTagsModal';
import { useUpdateAssessmentTags } from '../hooks/useAssessmentTagsMutate';
import { InlineToggle } from 'ui/forms';
import { Acl } from 'features/profile';

// interface Props {
//   code: string;
//   label: string;
// }

function AssessmentTagList() {
  const [filter, setFilter] = useState(INIT_FILTER_STATE);
  const { isFetching, data } = useAssessmentTagList(filter);
  const handleEdit = (row: TAssessmentTags) => () => {
    showAssessmentTagsModal(row);
  };
  // const deletor = useDeleteAssessmentTags();
  const updator = useUpdateAssessmentTags();
  // const handleDelete = (row: TAssessmentTags) => () => {
  //   showAlert({
  //     message: 'Are you sure you want to delete?',
  //     onYes: (closeAlert) => {
  //       deletor.mutate(
  //         { id: `${row.id}` },
  //         {
  //           onSuccess: () => {
  //             closeAlert();
  //           },
  //         }
  //       );
  //     },
  //     yesLabel: 'Delete',
  //     variant: 'danger',
  //   });
  // };
  const handleToggle = (payload: TAssessmentTags) => {
    updator.mutate(
      {
        id: String(payload.id),
        payload,
      },
      {
        onSuccess: () => {},
      }
    );
  };
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <DatasetFilter onChange={setFilter} />
        <Acl code={['assessment-tags-manage']}>
          <Button
            size="sm"
            variant="primary"
            onClick={() => showAssessmentTagsModal({})}
          >
            Add Assessment Tags
          </Button>
        </Acl>
      </div>
      <FitContent>
        <Table isLoading={isFetching} data={data?.list ?? []}>
          <TableColumn
            id="is_active"
            label="Is Active"
            render={(row: TAssessmentTags) => (
              <Acl
                code={['assessment-tags-manage']}
                replace={
                  <InlineToggle
                    label="Active"
                    onChange={(newValue) =>
                      handleToggle({
                        ...row,
                        is_active: newValue === true ? 1 : 0,
                      })
                    }
                    disabled
                    value={row.is_active === 1}
                  />
                }
              >
                <InlineToggle
                  label="Active"
                  onChange={(newValue) =>
                    handleToggle({
                      ...row,
                      is_active: newValue === true ? 1 : 0,
                    })
                  }
                  value={row.is_active === 1}
                />
              </Acl>
            )}
          />
          <TableColumn
            id="code"
            label="Code"
            render={(row: TAssessmentTags) => (
              <div className="text-sm">
                <div className="font-semibold">{row.code}</div>
                <div>{row.description}</div>
              </div>
            )}
          />
          <TableColumn
            id="action"
            label="Action"
            width="180px"
            render={(row: TAssessmentTags) => (
              <Acl code={['assessment-tags-manage']}>
                <div className="flex space-x-1">
                  <Button size="sm" onClick={handleEdit(row)}>
                    Edit
                  </Button>
                  {/* <Button variant='danger' size='sm' onClick={handleDelete(row)}>
                  Delete
                </Button> */}
                </div>
              </Acl>
            )}
          />
        </Table>
      </FitContent>
      <Pagination className="mt-4" onChange={setFilter} value={data?.pager} />
    </>
  );
}

export default AssessmentTagList;
