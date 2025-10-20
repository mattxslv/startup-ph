import { useState } from 'react';
import {
  HiChevronLeft,
  HiChevronRight,
  HiZoomIn,
  HiZoomOut,
} from 'react-icons/hi';
import clsx from 'clsx';
import { GrRotateLeft, GrRotateRight } from 'react-icons/gr';
import { GoMirror } from 'react-icons/go';
import { MdClear } from 'react-icons/md';
import { Button } from 'ui/components';

interface Props {
  list: Array<{
    filename: string;
    file_url: string;
  }>;
}

function ImagePreview({ list }: Props) {
  const [selected, setSelected] = useState(0);
  const current = list[selected] || list[0] || {};
  const [zoom, setZoom] = useState(100);
  const [rotate, setRotate] = useState(0);
  const [mirror, setMirror] = useState(false);
  const renderControls = () => (
    <div className="absolute bottom-0 left-0 p-2 z-10 flex items-center divide-x">
      <Button
        className="border-x-0 rounded-r-none"
        onClick={() => {
          setZoom(zoom + zoom * 0.4);
        }}
      >
        <HiZoomIn />
      </Button>
      <Button
        className="border-x-0 rounded-none"
        onClick={() => {
          setZoom(zoom - zoom * 0.4);
        }}
      >
        <HiZoomOut />
      </Button>
      <Button
        className="border-x-0 rounded-none"
        onClick={() => {
          setRotate(rotate - (90 % 360));
        }}
      >
        <GrRotateRight />
      </Button>
      <Button
        className="border-x-0 rounded-none"
        onClick={() => {
          setRotate(rotate + (90 % 360));
        }}
      >
        <GrRotateLeft />
      </Button>
      <Button
        className="border-x-0 rounded-none"
        onClick={() => {
          setMirror(!mirror);
        }}
      >
        <GoMirror />
      </Button>
      <Button
        className="border-x-0 rounded-l-none"
        onClick={() => {
          setZoom(100);
          setRotate(0);
          setMirror(false);
        }}
      >
        <MdClear />
      </Button>
    </div>
  );
  return (
    <div>
      <div
        className={clsx(
          'flex items-center flex-wrap mt-4 mb-2',
          list.length < 2 ? 'hidden' : ''
        )}
      >
        <div className="mr-auto flex items-center">
          <Button
            className="rounded-r-none"
            onClick={() => {
              const nextIndex = list.findIndex((x) => x === current);
              setSelected(
                list[nextIndex - 1] ? nextIndex - 1 : list.length - 1
              );
            }}
          >
            <HiChevronLeft />
          </Button>
          <Button className="min-w-[140px] border-x-0 rounded-none">
            {current?.filename || '- n/a -'}
          </Button>
          <Button
            className="rounded-l-none"
            onClick={() => {
              const nextIndex = list.findIndex((x) => x === current);
              setSelected(list[nextIndex + 1] ? nextIndex + 1 : 0);
            }}
          >
            <HiChevronRight />
          </Button>
        </div>
        <div>{list.length} Requirement/s</div>
      </div>

      <div className="relative pt-[56.25%] isolate bg-slate-100">
        {renderControls()}
        <div className="absolute inset-0 h-full w-full overflow-auto px-2 pb-2 flex">
          {!current.file_url ? (
            <div className="text-center text-gray-600 py-6 w-full">
              No uploaded file.
            </div>
          ) : (
            <div
              className="relative inline-block m-auto w-full pt-[100%] transform origin-top-left"
              style={{
                transform: `scale(${zoom / 100})`,
              }}
            >
              <div
                className="absolute inset-0 h-full w-full transform origin-center"
                style={{
                  transform: `rotate(${Math.abs(rotate) % 360}deg) scaleX(${
                    mirror ? '-1' : '1'
                  })`,
                }}
              >
                <img
                  className={clsx(
                    'h-full w-full object-center object-contain',
                    'transform origin-center'
                  )}
                  src={current.file_url}
                  alt="File Preview"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImagePreview;
