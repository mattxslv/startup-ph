import { Img, TabItem, TabNav, TabPanel, TabProvider } from 'ui/components';
import ProgramDetails from './ProgramDetails';
import useProgramById from '../hooks/useProgramById';
import { usePublishProgram, useUpdateProgram } from '../hooks/useProgramMutate';
import ProgramRequirements from './ProgramRequirements';
import ProgramApplications from './ProgramStartups';
import { Acl } from 'features/profile';
import 'egov-upload-widget/styles';
import FileUploader from 'ui/components/file-uploader/FileUploader';
import { CustomUploader } from 'components';
import { InlineToggle } from 'ui/forms';

type Props = {
  id: string;
  resetSelected: () => void;
};

function ProgramById({ id, resetSelected }: Props) {
  const { isFetching, data } = useProgramById(id);
  const updator = useUpdateProgram();
  const publisher = usePublishProgram();

  if (!data)
    return (
      <div className="text-center">
        {isFetching ? 'Loading...' : 'No Data Loaded'}
      </div>
    );

  const handleChange = (e: any) => {
    const { url } = e.target.value;
    updator.mutate({
      id: data.id,
      payload: { ...data, thumbnail_url: url },
    });
  };

  const handlePublish = () => {
    publisher.mutate({ id: data.id });
  };

  return (
    <TabProvider id="program" defaultTab="details">
      <div>
        <div className="flex gap-x-4">
          <Acl
            code={['programs-manage']}
            replace={
              <Img
                alt={data.name}
                className="h-24 w-32 flex-none rounded ring-1 ring-slate-900/10 p-1"
                src={data.thumbnail_url}
              />
            }
          >
            <FileUploader
              file={data.thumbnail_url ? { url: data.thumbnail_url } : null}
              onChange={handleChange}
              accept={['image/png', 'image/jpg', 'image/jpeg']}
              customRender={
                <CustomUploader
                  dataName={data.name}
                  dataUrl={data.thumbnail_url}
                />
              }
            />
            {/* <Uploader
              apiKey={import.meta.env.VITE_UPLOADER_API_KEY}
              environment={import.meta.env.VITE_UPLOADER_ENVIRONMENT}
              project={import.meta.env.VITE_UPLOADER_PROJECT}
              value={data.banner_url ? { url: data.banner_url } : null}
              maxFileSize={5242880}
              onChange={handleChange}
              // onDelete={handleDelete}
              fileTypes={['image/png', 'image/jpeg']}
              customRender={<CustomUploaderComponent programData={data} />}
            /> */}
            {/* <ImageEdit
              onUploadSuccess={(thumbnailUrl) => {
                updator.mutate({ id: data.id, payload: { ...data, thumbnail_url: thumbnailUrl } });
              }}
            >
              <Img
                alt={data.name}
                className='h-24 w-32 flex-none rounded ring-1 ring-slate-900/10 p-1'
                src={data.thumbnail_url}
              />
            </ImageEdit> */}
          </Acl>
          <div className="flex-1 min-w-0 my-auto">
            <div className="flex gap-5 justify-between items-center">
              <div className="mt-1 text-xl tracking-wide font-semibold leading-6 text-slate-900">
                {data.name}
              </div>

              <label className="flex items-center gap-1">
                <InlineToggle
                  label="Publish"
                  onChange={handlePublish}
                  value={Boolean(data.is_published)}
                />
                <small className="font-semibold">Publish</small>
              </label>
            </div>
            <div className="text-sm tracking-wide leading-6 text-slate-500">
              {data.agency} - {data.type}
            </div>
            <div className="text-sm tracking-wide leading-6 text-slate-500">
              {data.date_start} ~ {data.date_end}
            </div>
          </div>
          {/* <div>
            ...
          </div> */}
        </div>
      </div>
      <div className="my-4">
        <TabNav>
          <TabItem id="details" label="Details" />
          <TabItem
            id="requirements"
            label="Requirements"
            disabled={!data.date_start}
          />
          <Acl code={['applications-view']}>
            <TabItem
              id="applicants"
              label="Applicants"
              disabled={!data.date_start}
            />
          </Acl>
        </TabNav>
      </div>
      <TabPanel id="details">
        <div className="flex-1 flex flex-col">
          <ProgramDetails data={data} resetSelected={resetSelected} />
        </div>
      </TabPanel>
      <TabPanel id="requirements">
        <div className="flex-1 flex flex-col">
          <ProgramRequirements program={data} />
        </div>
      </TabPanel>
      <Acl code={['applications-view']}>
        <TabPanel id="applicants">
          <div className="flex-1 flex flex-col">
            <ProgramApplications programId={data.id} />
          </div>
        </TabPanel>
      </Acl>
    </TabProvider>
  );
}

export default ProgramById;
