import React, { useState, useRef, useEffect } from 'react';
import { HiX, HiCheck, HiUpload } from 'react-icons/hi';
import Image from 'next/image';

interface ImageCropModalProps {
  imageUrl: string;
  onClose: () => void;
  onSave: (croppedImageUrl: string) => void;
  onReplace: () => void;
  isCircle?: boolean;
}

const ImageCropModal: React.FC<ImageCropModalProps> = ({
  imageUrl,
  onClose,
  onSave,
  onReplace,
  isCircle = true,
}) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [minZoom, setMinZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Load image dimensions and calculate minimum zoom
  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
      
      // Set minimum zoom to 1 for object-cover
      setMinZoom(1);
      setZoom(1);
    };
    img.src = imageUrl;
  }, [imageUrl]);

  const constrainPosition = (newX: number, newY: number, currentZoom: number) => {
    if (!containerRef.current) return { x: newX, y: newY };

    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;
    
    // With object-cover, the image already fills the container
    // We just need to constrain based on zoom
    const scaledWidth = containerWidth * currentZoom;
    const scaledHeight = containerHeight * currentZoom;
    
    // Calculate boundaries
    const maxX = (scaledWidth - containerWidth) / 2;
    const maxY = (scaledHeight - containerHeight) / 2;
    
    // Constrain position within boundaries
    const constrainedX = Math.max(-maxX, Math.min(maxX, newX));
    const constrainedY = Math.max(-maxY, Math.min(maxY, newY));
    
    return { x: constrainedX, y: constrainedY };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newPos = constrainPosition(
      e.clientX - dragStart.x,
      e.clientY - dragStart.y,
      zoom
    );
    setPosition(newPos);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom);
    // Re-constrain position with new zoom level
    const newPos = constrainPosition(position.x, position.y, newZoom);
    setPosition(newPos);
  };

  const handleSave = () => {
    // For now, just save the original URL
    // In a full implementation, you'd generate a cropped version
    onSave(imageUrl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Edit Logo</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>

        {/* Image Preview Area */}
        <div className="p-6">
          <div
            ref={containerRef}
            className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="absolute inset-0 cursor-move"
              onMouseDown={handleMouseDown}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                transformOrigin: 'center center',
              }}
            >
              <Image
                src={imageUrl}
                alt="Logo preview"
                fill
                className="object-cover"
                draggable={false}
              />
            </div>

            {/* Crop overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className={`border-4 border-white shadow-lg ${
                  isCircle ? 'rounded-full' : 'rounded-lg'
                } w-64 h-64 bg-transparent`}
                style={{
                  boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
                }}
              />
            </div>
          </div>

          {/* Zoom Control */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zoom
            </label>
            <input
              type="range"
              min={minZoom}
              max="3"
              step="0.1"
              value={zoom}
              onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-4 border-t bg-gray-50">
          <button
            onClick={onReplace}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            <HiUpload className="w-4 h-4" />
            Replace Image
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              <HiCheck className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModal;
