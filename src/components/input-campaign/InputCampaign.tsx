/* eslint-disable @next/next/no-img-element */
import React, { useRef } from 'react';
import { Section } from './types';
import Drawer, { DrawerHandler } from './Drawer';
import AddSection from './AddSection';
import Button from '@/ui/button/Button';
import { HiDotsVertical, HiRefresh } from 'react-icons/hi';
import EditSection from './EditSection';
import SectionRichtext from './SectionRichtext';
import SectionEditWrapper from './SectionEditWrapper';
import Video from './Video';
import YoutubeEmbed from './YoutubeEmbed';
import ChangeOrder from './ChangeOrder';

type Props = {
  onChange: (newValue: Array<Section>) => void;
  value: Array<Section>;
};

function InputCampaign({ onChange, value }: Props) {
  const addSectionRef = useRef<DrawerHandler>(null);
  const editSectionRef = useRef<DrawerHandler>(null);
  const orderSectionRef = useRef<DrawerHandler>(null);
  const handleAdd = ({ _row_index, ...newSection }: any) => {
    if (typeof _row_index === 'number') {
      const newValue = value.map((x, i) => (i === _row_index ? newSection : x));
      const filteredValue = value.filter((x, i) => i !== _row_index);
      onChange(
        newSection.video_url || newSection.banner_url || newSection.content
          ? newValue
          : filteredValue
      );
      return;
    }
    if (!newSection.video_url && !newSection.banner_url && !newSection.content) return;
    onChange(value.concat([newSection]));
  };
  return (
    <>
      <div className='flex-1 relative'>
        <div className='absolute top-0 right-0 px-3 -translate-y-full pb-4'>
          <Button
            className='text-primary'
            size='sm'
            variant='link'
            leading={<HiDotsVertical />}
            onClick={() => {
              orderSectionRef.current?.show();
            }}
          >
            More
          </Button>
        </div>
        <div className='absolute inset-0 h-full w-full overflow-auto px-3 pb-4'>
          {value.length < 1 ? (
            <div className='text-center py-12 font-semibold'>
              <div className='text-lg'>Your Startup Page is Empty</div>
              <div className='text-sm'>Get started by adding a section!</div>
            </div>
          ) : (
            <div className='space-y-4 bg-white p-4'>
              {React.Children.toArray(
                value.map((item, i) => {
                  if (item.type === 'IMAGE')
                    return (
                      <SectionEditWrapper
                        onEdit={() => {
                          editSectionRef.current?.show({
                            _row_index: i,
                            ...item,
                          });
                        }}
                      >
                        <img className='w-full' src={item.banner_url} alt='' />
                      </SectionEditWrapper>
                    );
                  if (item.type === 'RICHTEXT')
                    return (
                      <SectionEditWrapper
                        onEdit={() => {
                          editSectionRef.current?.show({
                            _row_index: i,
                            ...item,
                          });
                        }}
                      >
                        <SectionRichtext content={item.content} />
                      </SectionEditWrapper>
                    );
                  if (item.type === 'VIDEO')
                    return (
                      <SectionEditWrapper
                        onEdit={() => {
                          editSectionRef.current?.show({
                            _row_index: i,
                            ...item,
                          });
                        }}
                        fullClick={false}
                      >
                        {item.source === 'custom' ? (
                          <Video url={item?.video_url} placeholder='Upload Video' />
                        ) : null}
                        {item.source === 'youtube' && item.video_url && item.thumbnail_url ? (
                          <YoutubeEmbed
                            embedUrl={item.video_url}
                            thumbnailUrl={item.thumbnail_url}
                            title={item.video_url}
                          />
                        ) : null}
                      </SectionEditWrapper>
                    );
                  return null;
                })
              )}
            </div>
          )}

          <div className='p-4 bg-white w-full border-t-4 border-slate-100'>
            <button
              className='px-14 mx-auto py-6 bg-primary text-white flex rounded-lg'
              type='button'
              onClick={() => {
                addSectionRef.current!.show();
              }}
            >
              <div className='m-auto font-semibold text-sm'>Add Section</div>
            </button>
          </div>

          <div className='h-20' />
        </div>
      </div>
      <Drawer ref={addSectionRef}>
        {({ onClose }) => (
          <AddSection
            onClose={onClose}
            onSelect={(section) => {
              editSectionRef.current?.show(section);
            }}
          />
        )}
      </Drawer>
      <Drawer ref={editSectionRef}>
        {({ props, onClose }) => (
          <EditSection data={props as Section} onClose={onClose} onSubmit={handleAdd} />
        )}
      </Drawer>
      <Drawer ref={orderSectionRef}>
        {({ onClose }) => <ChangeOrder onClose={onClose} onChange={onChange} data={value} />}
      </Drawer>
    </>
  );
}

export default InputCampaign;
