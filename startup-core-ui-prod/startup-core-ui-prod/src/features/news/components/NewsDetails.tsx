import { ImageEdit, Sanitize } from 'components';
import { INews } from '../types';
import {
  BadgeArray,
  Button,
  Card,
  Img,
  InfoHorizontal,
  Title,
  showAlert,
} from 'ui/components';
import { HiPencilAlt } from 'react-icons/hi';
import { showNewsModal } from '../modal/NewsModal';
import { useDeleteNews } from '../hooks/useNewsMutate';
import { Acl } from 'features/profile';

type Props = {
  data: INews;
  resetSelected: () => void;
};

function NewsDetails({ data, resetSelected }: Props) {
  const deletor = useDeleteNews();
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
              <Acl code={['news-manage']}>
                <Button
                  className="px-4"
                  size="xs"
                  variant="neutralPrimary"
                  leadingIcon={<HiPencilAlt />}
                  onClick={() => showNewsModal(data)}
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

      <Acl code={['news-manage']}>
        <Card>
          <div className="space-y-4 text-danger-base">
            <Title>Danger Zone</Title>
            <Button variant="danger" size="sm" onClick={handleDelete}>
              Delete News
            </Button>
          </div>
        </Card>
      </Acl>
    </div>
  );
}

export default NewsDetails;
