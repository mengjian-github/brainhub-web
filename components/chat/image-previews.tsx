/* eslint-disable @next/next/no-img-element */
import React from "react";
import ImagePreview from "../image-preview";

interface ImagePreviewsProps {
  previewUrls: string[];
  onDeleteImage: (index: number) => void;
}

export default function ImagePreviews({
  previewUrls,
  onDeleteImage,
}: ImagePreviewsProps) {
  if (previewUrls.length === 0) return null;

  const images = previewUrls.map((url) => ({ src: url }));

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      <ImagePreview
        images={images}
        altPrefix="预览"
        width={80}
        height={80}
        className="object-cover"
        onDeleteImage={onDeleteImage}
      />
    </div>
  );
}
