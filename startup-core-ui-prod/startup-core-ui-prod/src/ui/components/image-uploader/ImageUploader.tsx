import { showModal } from 'context/modal';
import { useCallback, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop/types';
import { HiHand, HiZoomIn, HiZoomOut } from 'react-icons/hi';
import Button, { IButtonProps } from '../button/Button';
import Toast from '../toast/Toast';
import getCroppedImg from './cropImage';
import useUploader from './useUploader';

interface Props {
  url: string;
  filename: string;
  type: string;
  config: ICropConfig;
  onSuccess: (url: string) => void;
  onClose: () => void;
}

interface IBtnProps extends IButtonProps {
  nativeButton?: boolean;
  cropConfig?: Partial<ICropConfig>;
  onSuccess: (url: string) => void;
}

const DEFAULT_CONFIG = {
  aspect: 1 / 1,
};

interface ICropConfig {
  aspect?: number;
}

async function readFile(file: File) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

export const showCropImage = (
  url: string,
  filename: string,
  type: string,
  onSuccess: (str: string) => void,
  config?: Partial<ICropConfig>
) => {
  showModal({
    id: 'crop-image',
    component: ImageUploader,
    props: {
      url,
      filename,
      type,
      config: { ...DEFAULT_CONFIG, ...config },
      onSuccess,
    },
  });
};

export const ImageUploaderButton = ({
  children,
  cropConfig,
  onSuccess,
  disabled,
  nativeButton,
  ...rest
}: IBtnProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current!.click();
  };

  const [uploader, progress] = useUploader();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file?.size > 5e6) {
      Toast.warning('Filesize maximum is 5mb');
      return;
    }
    if (!cropConfig) {
      uploader.mutate(
        {
          payload: { file },
        },
        {
          onSuccess: (outputUrl: string) => {
            onSuccess(outputUrl);
          },
        }
      );
      return;
    }
    readFile(file).then((url: any) => {
      showCropImage(
        url as string,
        file.name, // Filename
        file.type, // Type
        onSuccess,
        cropConfig
      );
    });
  };
  return (
    <>
      {nativeButton ? (
        <button
          {...rest}
          onClick={handleClick}
          disabled={typeof progress === 'number'}
        >
          {children}
        </button>
      ) : (
        <Button
          {...rest}
          onClick={handleClick}
          disabled={typeof progress === 'number'}
        >
          {typeof progress === 'number' ? `${progress}%` : children}
        </Button>
      )}
      <input
        className="hidden"
        ref={inputRef}
        type="file"
        title="Uploader"
        onChange={handleChange}
        accept="image/*"
        value=""
      />
    </>
  );
};

function ImageUploader({
  url,
  filename,
  type,
  config,
  onSuccess,
  onClose,
}: Props) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [outputPreview, setOutputPreview] = useState<any>(null);
  const [output, setOutput] = useState(null);
  const handleCropComplete = useCallback((ca: Area, cap: Area) => {
    setCroppedAreaPixels(cap);
  }, []);
  const handleCrop = () => {
    (async () => {
      const croppedBlob = (await getCroppedImg(
        url,
        croppedAreaPixels,
        type
      )) as any;
      setOutputPreview(URL.createObjectURL(croppedBlob));
      setOutput(croppedBlob);
    })();
  };
  const handleZoomIn = () => {
    setZoom((z) => z + 0.1);
  };
  const handleZoomOut = () => {
    setZoom((z) => z - 0.1);
  };
  const [uploader, progress] = useUploader();
  const handleSubmit = () => {
    const file = new File([output!], filename, { type });
    uploader.mutate(
      {
        payload: { file },
      },
      {
        onSuccess: (outputUrl: string) => {
          onSuccess(outputUrl);
          onClose();
        },
      }
    );
  };
  if (output) {
    return (
      <div className="space-y-3">
        <div className="relative aspect-square min-h-[320px]">
          <img
            className="absolute h-full w-full inset-0 object-contain object-center"
            src={outputPreview}
            alt="Cropped Image"
          />
        </div>
        <div className="flex justify-center space-x-1">
          <Button onClick={() => setOutput(null)}>Back</Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={typeof progress === 'number'}
          >
            {progress ? `Uploading...${progress}%` : 'Confirm'}
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <div className="relative py-12">
        <div className="aspect-square min-h-[320px]">
          <Cropper
            image={url}
            crop={crop}
            zoom={zoom}
            aspect={config.aspect}
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
            onZoomChange={setZoom}
          />
          <div className="absolute top-0 left-0 text-white text-xs flex w-full p-1">
            <div className="flex items-center mr-auto">
              <HiHand /> Drag to move/ Pinch to Zoom
            </div>
            <div className="flex items-end space-x-0 sm:space-x-2 flex-col">
              <a
                href="#zoom-in"
                className="flex items-center underline"
                onClick={handleZoomIn}
              >
                <HiZoomIn /> Zoom In
              </a>
              <a
                href="#zoom-out"
                className="flex items-center underline"
                onClick={handleZoomOut}
              >
                <HiZoomOut /> Zoom Out
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center space-x-1">
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleCrop}>
          Crop
        </Button>
      </div>
    </div>
  );
}

export default ImageUploader;
