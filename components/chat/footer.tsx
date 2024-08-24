import React from "react";
import ModelSelector from "./model-selector";
import InputArea from "./input-area";
import ImagePreviews from "./image-previews";

interface FooterProps {
  selectedModel: string;
  input: string;
  previewUrls: string[];
  onModelChange: (model: string) => void;
  onInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onImageUpload: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDeleteImage: (index: number) => void;
  onPaste: (event: React.ClipboardEvent<HTMLTextAreaElement>) => void;
  inputRef: React.RefObject<HTMLTextAreaElement>;
}

export default function Footer({
  selectedModel,
  input,
  previewUrls,
  onModelChange,
  onInputChange,
  onKeyDown,
  onButtonClick,
  onImageUpload,
  onDeleteImage,
  onPaste,
  inputRef,
}: FooterProps) {
  return (
    <footer className="flex-shrink-0 border-t p-4 bg-white">
      <ModelSelector
        value={selectedModel}
        onValueChange={onModelChange}
        className="mb-2 w-full lg:w-48"
      />
      <InputArea
        input={input}
        onInputChange={onInputChange}
        onKeyDown={onKeyDown}
        onButtonClick={onButtonClick}
        onImageUpload={onImageUpload}
        onPaste={onPaste}
        inputRef={inputRef}
      />
      <ImagePreviews previewUrls={previewUrls} onDeleteImage={onDeleteImage} />
    </footer>
  );
}
