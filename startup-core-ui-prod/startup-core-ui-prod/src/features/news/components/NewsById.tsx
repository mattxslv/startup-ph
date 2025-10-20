import { Img, TabItem, TabNav, TabPanel, TabProvider } from 'ui/components';
import NewsDetails from './NewsDetails';
import useNewsById from '../hooks/useNewsById';
import { useUpdateNews } from '../hooks/useNewsMutate';
import NewsContent from './NewsContent';
import { InlineToggle } from 'ui/forms';
import { INews } from '../types';
import { usePublishNewsToggle } from '../hooks/usePublishNewsToggle';
import { Acl } from 'features/profile';
import FileUploader from 'ui/components/file-uploader/FileUploader';
import { CustomUploader } from 'components';

type Props = {
  id: string;
  resetSelected: () => void;
};

function TogglePublish({ data }: { data: INews }) {
  const mutator = usePublishNewsToggle();
  return (
    <div className="flex flex-col items-end">
      <div className="text-sm font-semibold mb-1 text-description">
        Published
      </div>
      <InlineToggle
        onChange={() => {
          mutator.mutate({ id: String(data.id) });
        }}
        value={Boolean(data.is_published)}
      />
    </div>
  );
}

function NewsById({ id, resetSelected }: Props) {
  const { isFetching, data, dataUpdatedAt } = useNewsById(id);
  const updator = useUpdateNews();

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

  return (
    <TabProvider id="program" defaultTab="details">
      <div>
        <div className="flex gap-x-4">
          <Acl
            code={['news-manage']}
            replace={
              <Img
                alt={data.title}
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
                  dataName={data.title}
                  dataUrl={data.thumbnail_url}
                />
              }
            />
            {/* <ImageEdit
              onUploadSuccess={(thumbnailUrl) => {
                updator.mutate({ id: data.id, payload: { ...data, thumbnail_url: thumbnailUrl } });
              }}
            >
              <Img
                alt={data.title}
                className='h-24 w-32 flex-none rounded ring-1 ring-slate-900/10 p-1'
                src={data.thumbnail_url}
              />
            </ImageEdit> */}
          </Acl>
          <div className="flex-1 min-w-0 my-auto">
            <div className="mt-1 text-xl tracking-wide font-semibold leading-6 text-slate-900">
              {data.title}
            </div>
            <div className="text-sm tracking-wide leading-6 text-slate-500">
              {data.publish_date} ~ {data.publish_by}
            </div>
          </div>
          <Acl code={['news-manage']}>
            <TogglePublish data={data} />
          </Acl>
        </div>
      </div>
      <div className="my-4">
        <TabNav>
          <TabItem id="details" label="Details" />
          <TabItem id="content" label="Content" />
        </TabNav>
      </div>
      <TabPanel id="details">
        <div className="flex-1 flex flex-col">
          <NewsDetails data={data} resetSelected={resetSelected} />
        </div>
      </TabPanel>
      <TabPanel id="content">
        <div className="flex-1 flex flex-col border rounded-lg p-4">
          <NewsContent key={dataUpdatedAt} data={data} />
        </div>
      </TabPanel>
    </TabProvider>
  );
}

export default NewsById;
