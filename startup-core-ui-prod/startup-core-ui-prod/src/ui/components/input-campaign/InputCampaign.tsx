/* eslint-disable @next/next/no-img-element */
import React, { useRef } from 'react';
import { Section } from './types';
import Drawer, { DrawerHandler } from './Drawer';
import AddSection from './AddSection';
import { HiDotsVertical } from 'react-icons/hi';
import EditSection from './EditSection';
import SectionRichtext from './SectionRichtext';
import SectionEditWrapper from './SectionEditWrapper';
import Video from './Video';
import YoutubeEmbed from './YoutubeEmbed';
import ChangeOrder from './ChangeOrder';
import Button from '../button/Button';
import { Acl } from 'features/profile';

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
      onChange(value.map((x, i) => (i === _row_index ? newSection : x)));
      return;
    }
    onChange(value.concat([newSection]));
  };
  return (
    <>
      <div className="flex-1 relative">
        <div className="absolute top-0 right-0 px-3 -translate-y-full pb-4">
          <Acl code={['news-manage']}>
            <Button
              className="text-primary"
              size="sm"
              variant="link"
              leadingIcon={<HiDotsVertical />}
              onClick={() => {
                orderSectionRef.current?.show();
              }}
            >
              More
            </Button>
          </Acl>
        </div>
        <div className="absolute inset-0 h-full w-full overflow-auto px-3 pb-4">
          {value.length < 1 ? (
            <div className="text-center py-12 font-semibold">
              <div className="text-lg">Your News Page is Empty</div>
              <div className="text-sm">Get started by adding a section!</div>
            </div>
          ) : (
            <div>
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
                        <img className="w-full" src={item.banner_url} alt="" />
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
                          <Video
                            url={item?.video_url}
                            placeholder="Upload Video"
                          />
                        ) : null}
                        {item.source === 'youtube' &&
                        item.video_url &&
                        item.thumbnail_url ? (
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

          <Acl code={['news-manage']}>
            <button
              className="w-full border-2 border-dashed border-description text-description hover:border-primary-base hover:text-primary-base py-6 bg-white/70 flex rounded-lg mt-4"
              type="button"
              onClick={() => {
                addSectionRef.current!.show();
              }}
            >
              <div className="m-auto font-semibold text-sm">Add Section</div>
            </button>
          </Acl>

          <div className="h-20" />
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
          <EditSection
            data={props as Section}
            onClose={onClose}
            onSubmit={handleAdd}
          />
        )}
      </Drawer>
      <Drawer ref={orderSectionRef}>
        {({ onClose }) => (
          <ChangeOrder onClose={onClose} onChange={onChange} data={value} />
        )}
      </Drawer>
    </>
  );
}

export default InputCampaign;
