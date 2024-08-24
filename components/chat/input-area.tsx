/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Send, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";

interface InputAreaProps {
  input: string;
  onInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onImageUpload: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onPaste: (event: React.ClipboardEvent<HTMLTextAreaElement>) => void;
  inputRef: React.RefObject<HTMLTextAreaElement>;
}

export default function InputArea({
  input,
  onInputChange,
  onKeyDown,
  onButtonClick,
  onImageUpload,
  onPaste,
  inputRef,
}: InputAreaProps) {
  return (
    <div className="relative">
      <Textarea
        ref={inputRef}
        value={input}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
        className="w-full pr-24 resize-none min-h-[40px]"
        placeholder="输入您的问题 (Shift+Enter换行)"
        rows={1}
        enterkeyhint="send"
      />
      <div className="absolute right-2 bottom-0 flex">
        <Button
          onClick={onImageUpload}
          size="icon"
          variant="ghost"
          className="mr-2"
        >
          <Image className="w-5 h-5" />
        </Button>
        <Button onClick={onButtonClick} size="icon" variant="ghost">
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
