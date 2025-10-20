import { Sanitize } from 'components';
import { IProgram } from '../types';
import {
  Button,
  Card,
  Img,
  InfoHorizontal,
  Title,
  Toast,
  showAlert,
} from 'ui/components';
import { HiPencilAlt } from 'react-icons/hi';
import { showProgramBodyModal, showProgramModal } from '../modal/ProgramModal';
import { useDeleteProgram, useUpdateProgram } from '../hooks/useProgramMutate';
import FileUploader from 'ui/components/file-uploader/FileUploader';
import formatNumber from 'utils/formatNumber';
import { Acl } from 'features/profile';
import { useEffect } from 'react';

const CustomProgramUploader = (props: any): JSX.Element => {
  const {
    onToggleMenu,
    MenuComponent,
    isShowMenu,
    progressPercentage,
    dataName,
    dataUrl,
    error,
  } = props;
  useEffect(() => {
    if (!error) return;
    Toast.error(error);
  }, [error]);
  return (
    <div className="relative">
      <button
        className="absolute inset-0 h-full w-full z-30"
        type="button"
        onClick={onToggleMenu}
      />
      <div className="relative pt-[56.25%] bg-slate-100 border rounded-lg overflow-hidden">
        <div className="absolute inset-0 h-full w-full">
          <Img
            className="h-full w-full"
            imgClassName="object-contain object-center"
            src={dataUrl}
            alt={dataName}
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-black/30 z-20 text-xs text-center py-0.5 text-white">
        {typeof progressPercentage === 'number'
          ? `- ${formatNumber(progressPercentage, 1)}% -`
          : 'Click to edit'}
      </div>
      <div>{isShowMenu ? MenuComponent : null}</div>
    </div>
  );
};

type Props = {
  data: IProgram;
  resetSelected: () => void;
};

function ProgramDetails({ data, resetSelected }: Props) {
  const updator = useUpdateProgram();
  const deletor = useDeleteProgram();
  const handleDelete = () => {
    showAlert({
      message: 'Are you sure you want to delete?',
      onYes: (closeAlert) => {
        deletor.mutate(
          { id: `${data.id}` },
          {
            onSuccess: () => {
              resetSelected();
              closeAlert();
            },
          }
        );
      },
      yesLabel: 'Delete',
      variant: 'danger',
    });
  };
  const handleChange = (e: any) => {
    const { url } = e.target.value;
    updator.mutate({ id: data.id, payload: { ...data, banner_url: url } });
  };
  return (
    <div className="space-y-4">
      <Card>
        <div className="flex">
          <div className="space-y-4 flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <Title>Information</Title>
              <Acl code={['programs-manage']}>
                <Button
                  className="px-4"
                  size="xs"
                  variant="neutralPrimary"
                  leadingIcon={<HiPencilAlt />}
                  onClick={() => showProgramModal(data)}
                >
                  Edit
                </Button>
              </Acl>
            </div>
            <InfoHorizontal labelWidth="100px" label="Name">
              {data.name || '-'}
            </InfoHorizontal>
            <InfoHorizontal labelWidth="100px" label="Agency">
              {data.agency || '-'}
            </InfoHorizontal>
            <InfoHorizontal labelWidth="100px" label="Type">
              {data.type || '-'}
            </InfoHorizontal>
            <InfoHorizontal labelWidth="100px" label="Description">
              {data.description || '-'}
            </InfoHorizontal>
            <InfoHorizontal labelWidth="100px" label="Date Start">
              {data.date_start || '-'}
            </InfoHorizontal>
            <InfoHorizontal labelWidth="100px" label="Date End">
              {data.date_end || '-'}
            </InfoHorizontal>
          </div>
          <div className="space-y-4 w-96">
            <Acl
              code={['programs-manage']}
              replace={
                <div className="relative pt-[56.25%] bg-slate-100 border rounded-lg overflow-hidden">
                  <div className="absolute inset-0 h-full w-full">
                    <Img
                      className="h-full w-full"
                      imgClassName="object-contain object-center"
                      src={data.banner_url}
                      alt={data.name}
                    />
                  </div>
                </div>
              }
            >
              <FileUploader
                file={data.banner_url ? { url: data.banner_url } : null}
                onChange={handleChange}
                accept={['image/png', 'image/jpg', 'image/jpeg']}
                customRender={
                  <CustomProgramUploader
                    dataName={data.name}
                    dataUrl={data.banner_url}
                  />
                }
              />
            </Acl>
            {/* <ImageEdit onUploadSuccess={(bannerUrl) => {
              updator.mutate({ id: data.id, payload: { ...data, banner_url: bannerUrl } })
            }}>
              <div className="relative pt-[56.25%] bg-slate-100 border rounded-lg overflow-hidden">
                <div className="absolute inset-0 h-full w-full">
                  <Img className="h-full w-full" imgClassName="object-contain object-center" src={data.banner_url} alt={data.name} />
                </div>
              </div>
            </ImageEdit> */}
          </div>
        </div>
      </Card>
      <Card>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Title>Program Details</Title>
            <Acl code={['programs-manage']}>
              <Button
                className="px-4"
                size="xs"
                variant="neutralPrimary"
                leadingIcon={<HiPencilAlt />}
                onClick={() => showProgramBodyModal(data)}
              >
                Edit
              </Button>
            </Acl>
          </div>
          <div className="min-h-[200px]">
            {data.body ? (
              <Sanitize value={data.body} />
            ) : (
              <div>- No Content -</div>
            )}
          </div>
        </div>
      </Card>
      <Acl code={['programs-manage']}>
        <Card>
          <div className="space-y-4 text-danger-base">
            <Title>Danger Zone</Title>
            <Button variant="danger" size="sm" onClick={handleDelete}>
              Delete This Program
            </Button>
          </div>
        </Card>
      </Acl>
    </div>
  );
}

export default ProgramDetails;
