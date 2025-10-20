/* eslint-disable @next/next/no-img-element */
import { Section } from './types';
import { HiPencil, HiX } from 'react-icons/hi';
import Video from './Video';
import YoutubeEmbed from './YoutubeEmbed';
import Button from '../button/Button';
import { Form, InputRichText, InputSelect, InputYoutube } from 'ui/forms';
import Title from '../title/Title';
import FileUploader from '../file-uploader/FileUploader';
import { CgSpinner } from 'react-icons/cg';
import formatNumber from 'utils/formatNumber';
import { useEffect } from 'react';
import Toast from '../toast/Toast';

const CustomEditUploader = (props: any) => {
  const {
    onToggleMenu,
    MenuComponent,
    isShowMenu,
    progressPercentage,
    dataUrl,
    label,
    children,
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
      <div className="absolute top-0 right-0 bg-black/20 rounded-bl-lg z-20">
        <Button
          className="text-white"
          onClick={onToggleMenu}
          variant="link"
          leadingIcon={
            progressPercentage ? (
              <CgSpinner className="animate-spin" />
            ) : (
              <HiPencil />
            )
          }
          size="xs"
        >
          {progressPercentage
            ? `- ${formatNumber(progressPercentage, 1)}% -`
            : label}
        </Button>
      </div>
      <div className="relative pt-[56.25%] bg-gray-400">
        <div className="absolute inset-0 h-full w-full flex">
          {dataUrl ? (
            <img
              className="object-center object-contain inset-0 absolute h-full w-full"
              src={dataUrl}
              alt=""
            />
          ) : (
            <>{children}</>
          )}
        </div>
      </div>
      <div className="absolute top-5 right-2 w-32">
        {isShowMenu ? MenuComponent : null}
      </div>
    </div>
  );
};

type Props = {
  data: Section;
  onClose: () => void;
  onSubmit: (newSection: Section) => void;
};

function EditSection({ data, onClose, onSubmit }: Props) {
  const checkIsDisabled = (
    type: 'RICHTEXT' | 'VIDEO' | 'IMAGE',
    values: any
  ): boolean => {
    if (type === 'IMAGE' && !values?.banner_url) return true;
    if (type === 'VIDEO') {
      if (values?.source === 'custom' && !values?.video_url) return true;
      if (values?.source === 'youtube' && !values?.video_url) return true;
    }
    return false;
  };
  return (
    <Form
      initialValues={data}
      onSubmit={(payload) => {
        onSubmit(payload as Section);
        onClose();
      }}
    >
      {({ values, setFieldValue }) => (
        <>
          <div className="flex justify-between mb-4">
            <Title>Edit Section</Title>
            <Button size="xs" onClick={() => onClose()}>
              <HiX />
            </Button>
          </div>
          <div className="space-y-2">
            {data.type === 'RICHTEXT' ? (
              <InputRichText name="content" required />
            ) : null}
            {data.type === 'IMAGE' ? (
              <FileUploader
                file={values?.banner_url ? { url: values?.banner_url } : null}
                onChange={(e: any) => {
                  const { url } = e.target.value;
                  setFieldValue('banner_url', url);
                }}
                accept={['image/png', 'image/jpg', 'image/jpeg']}
                customRender={
                  <CustomEditUploader
                    label={
                      values?.banner_url ? 'Re-upload Image' : 'Upload Image'
                    }
                    dataUrl={values?.banner_url}
                  >
                    <div className="m-auto text-xl text-center font-light tracking-tighter text-white">
                      Upload Image
                    </div>
                  </CustomEditUploader>
                }
              />
            ) : null}
            {data.type === 'VIDEO' ? (
              <>
                <InputSelect
                  name="source"
                  label="Source"
                  options={[
                    { label: 'Custom', value: 'custom' },
                    { label: 'Youtube', value: 'youtube' },
                  ]}
                  required
                />
                {values?.source === 'custom' ? (
                  <FileUploader
                    file={
                      values?.banner_url ? { url: values?.banner_url } : null
                    }
                    onChange={(e: any) => {
                      const { url } = e.target.value;
                      console.log('url', url);
                      setFieldValue('video_url', url);
                      setFieldValue('thumbnail_url', '');
                    }}
                    accept={['video/mp4', 'video/x-m4v', 'video/quicktime']}
                    customRender={
                      <CustomEditUploader
                        label={
                          values?.banner_url
                            ? 'Re-upload Video'
                            : 'Upload Video'
                        }
                        dataUrl={values?.banner_url}
                      >
                        <Video
                          url={values?.video_url}
                          placeholder="Upload Video"
                        />
                      </CustomEditUploader>
                    }
                  />
                ) : null}
                {values?.source === 'youtube' ? (
                  <>
                    <InputYoutube
                      urlName="video_url"
                      thumbnailName="thumbnail_url"
                      label="Youtube Link"
                      required
                      placeholder="- Paste Youtube Link -"
                    />
                    {values?.video_url && values?.thumbnail_url ? (
                      <YoutubeEmbed
                        title={values?.video_url}
                        embedUrl={values?.video_url}
                        thumbnailUrl={values?.thumbnail_url}
                      />
                    ) : null}
                  </>
                ) : null}
              </>
            ) : null}
          </div>
          <div className="flex justify-center mt-4">
            <Button
              variant="primary"
              type="submit"
              disabled={checkIsDisabled(data.type, values)}
            >
              Save
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}

export default EditSection;
