import React, { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { X } from "lucide-react";

interface ImagePreviewProps {
  images: { src: string }[];
  altPrefix?: string;
  width?: number;
  height?: number;
  className?: string;
  onDeleteImage?: (index: number) => void;
}

export default function ImagePreview({
  images,
  altPrefix = "附件",
  width = 200,
  height = 200,
  className = "",
  onDeleteImage,
}: ImagePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <>
      {images.map((image, index) => (
        <div
          key={`${image.src}-${index}`}
          className="mt-2 relative inline-block"
        >
          <Image
            src={image.src}
            alt={`${altPrefix} ${index + 1}`}
            width={width}
            height={height}
            className={`rounded-md border-2 border-gray-300 cursor-pointer hover:opacity-80 transition-opacity ${className}`}
            onClick={() => {
              setPhotoIndex(index);
              setIsOpen(true);
            }}
          />
          {onDeleteImage && (
            <button
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteImage(index);
              }}
            >
              <X size={12} />
            </button>
          )}
        </div>
      ))}

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={images}
        index={photoIndex}
      />
    </>
  );
}
