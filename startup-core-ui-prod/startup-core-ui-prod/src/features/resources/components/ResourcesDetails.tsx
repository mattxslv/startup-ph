import { IResources } from '../types';
import {
  BadgeArray,
  Button,
  Card,
  InfoHorizontal,
  Title,
  showAlert,
} from 'ui/components';
import { HiPencilAlt } from 'react-icons/hi';
import { Acl } from 'features/profile';
import { useDeleteResources } from '../hooks/useResourcesMutate';
import { showResourcesModal } from '../modal/ResourcesModal';

type Props = {
  data: IResources;
  resetSelected: () => void;
};

function ResourcesDetails({ data, resetSelected }: Props) {
  const deletor = useDeleteResources();
  const handleDelete = () => {
    showAlert({
      message: 'Are you sure you want to delete?',
      onYes: (closeAlert) => {
        deletor.mutate(
          { id: `${data.id}` },
          {
            onSuccess: () => {
              closeAlert();
              resetSelected();
            },
          }
        );
      },
      yesLabel: 'Delete',
      variant: 'danger',
    });
  };
  return (
    <div className="space-y-4">
      <Card>
        <div className="flex">
          <div className="space-y-4 flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <Title>Information</Title>
              <Acl code={['resources-manage']}>
                <Button
                  className="px-4"
                  size="xs"
                  variant="neutralPrimary"
                  leadingIcon={<HiPencilAlt />}
                  onClick={() => showResourcesModal(data)}
                >
                  Edit
                </Button>
              </Acl>
            </div>
            <InfoHorizontal labelWidth="100px" label="Title">
              {data.title || '-'}
            </InfoHorizontal>
            <InfoHorizontal labelWidth="100px" label="Sub Title">
              {data.sub_title || '-'}
            </InfoHorizontal>
            <InfoHorizontal labelWidth="100px" label="Published By">
              {data.publish_by || '-'}
            </InfoHorizontal>
            <InfoHorizontal labelWidth="100px" label="Publish Date">
              {data.publish_date || '-'}
            </InfoHorizontal>
            <InfoHorizontal labelWidth="100px" label="Tags">
              <BadgeArray list={data?.tags} />
            </InfoHorizontal>
          </div>
        </div>
      </Card>

      <Acl code={['resources-manage']}>
        <Card>
          <div className="space-y-4 text-danger-base">
            <Title>Danger Zone</Title>
            <Button variant="danger" size="sm" onClick={handleDelete}>
              Delete Resources
            </Button>
          </div>
        </Card>
      </Acl>
    </div>
  );
}

export default ResourcesDetails;
