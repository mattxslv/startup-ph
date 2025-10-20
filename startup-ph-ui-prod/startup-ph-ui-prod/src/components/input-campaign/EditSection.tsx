/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Section } from './types';
import Title from '../home/Title';
import Button from '@/ui/button/Button';
import { HiUpload, HiX } from 'react-icons/hi';
import Form from '@/ui/form/Form';
import dynamic from 'next/dynamic';
// import ToggleFileUpload from '../partial/ToggleFileUpload';
import InputSelect from '@/ui/form/InputSelect';
// import Video from './Video';
import InputYoutube from '@/ui/form/InputYoutube';
import YoutubeEmbed from './YoutubeEmbed';
import InputFileV2 from '@/ui/form/InputFileV2';

const InlineRichtext = dynamic(() => import('@/ui/form/InlineRichtext'), {
  ssr: false,
  loading: () => <div />,
});

type Props = {
  data: Section;
  onClose: () => void;
  onSubmit: (newSection: Section) => void;
};

function EditSection({ data, onClose, onSubmit }: Props) {
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
          <div className='flex justify-between mb-4'>
            <Title label='Edit Section' />
            <Button size='xs' onClick={() => onClose()}>
              <HiX />
            </Button>
          </div>
          <div className='space-y-2'>
            {data.type === 'RICHTEXT' ? (
              <InlineRichtext
                onChange={(newValue) => setFieldValue('content', newValue)}
                value={values?.content || ''}
              />
            ) : null}
            {data.type === 'IMAGE' ? (
              <InputFileV2
                placeholder={
                  <div className='flex items-center justify-center w-full text-gray-400 text-xs'>
                    <HiUpload className='w-5 h-5 mr-1' />
                    Choose image to upload
                  </div>
                }
                name='banner_url'
                note='*JPG, PNG (max. 5mb)'
                imageOnly
              />
            ) : // <ToggleFileUpload label={values?.banner_url ? "Re-upload Image" : "Upload Image"} onUploadSuccess={(banner_url) => {
            //   setFieldValue('banner_url', banner_url);
            // }} compress>
            //   <div className="relative pt-[56.25%] bg-gray-400">
            //     <div className="absolute inset-0 h-full w-full flex">
            //       {values?.banner_url
            //         ? <img className="object-center object-contain inset-0 absolute h-full w-full" src={values?.banner_url} alt="" />
            //         : <span className="m-auto text-xl text-center font-light tracking-tighter text-white">Upload Image</span>}
            //     </div>
            //   </div>
            // </ToggleFileUpload>
            null}
            {data.type === 'VIDEO' ? (
              <>
                <InputSelect
                  name='source'
                  label='Source'
                  options={[
                    { label: 'Custom', value: 'custom' },
                    { label: 'Youtube', value: 'youtube' },
                  ]}
                  required
                />
                {values?.source === 'custom' ? (
                  <InputFileV2
                    accept={['video/mp4', 'video/x-m4v', 'video/quicktime']}
                    placeholder={
                      <div className='flex items-center justify-center w-full text-gray-400 text-xs'>
                        <HiUpload className='w-5 h-5 mr-1' />
                        Choose video to upload
                      </div>
                    }
                    onUploadSuccess={() => {
                      setFieldValue('thumbnail_url', '');
                    }}
                    name='video_url'
                  />
                ) : // <ToggleFileUpload
                //   accept='video/mp4,video/x-m4v,video/*'
                //   label={!Boolean(values?.video_url) ? 'Upload Video' : 'Replace Video'}
                //   onUploadSuccess={(fileUrl) => {
                //     setFieldValue('video_url', fileUrl);
                //     setFieldValue('thumbnail_url', '');
                //   }}
                //   fullClick={!Boolean(values?.video_url)}
                // >
                //   <Video url={values?.video_url} placeholder='Upload Video' />
                // </ToggleFileUpload>
                null}
                {values?.source === 'youtube' ? (
                  <>
                    <InputYoutube
                      urlName='video_url'
                      thumbnailName='thumbnail_url'
                      label='Youtube Link'
                      required
                      placeholder='- Paste Youtube Link -'
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
          <div className='flex justify-center mt-4'>
            <Button variant='primary' type='submit'>
              Save
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}

export default EditSection;
