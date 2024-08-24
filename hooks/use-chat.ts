"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useChat as useAIChat } from "ai/react";

export default function useChat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    error,
    reload: originReload,
  } = useAIChat();

  useEffect(() => {
    const storedModel =
      localStorage.getItem("selectedModel") || "claude-3-5-sonnet";
    setSelectedModel(storedModel);
  }, []);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleModelChange = useCallback((value: string) => {
    setSelectedModel(value);
    localStorage.setItem("selectedModel", value);
  }, []);

  const modelRequestBody = useMemo(
    () => ({
      body: { model: selectedModel },
      experimental_attachments: files ?? undefined,
    }),
    [selectedModel, files]
  );

  const reload = useCallback(
    () => originReload(modelRequestBody),
    [originReload, modelRequestBody]
  );

  const handleSubmitWithModel = useCallback(
    (e: React.SyntheticEvent) => {
      handleSubmit(e, modelRequestBody);
      setFiles(null);
      setPreviewUrls([]);
    },
    [handleSubmit, modelRequestBody]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!e.nativeEvent.isComposing && e.key === "Enter" && !e.shiftKey) {
        handleSubmitWithModel(e);
        inputRef.current?.blur();
      }
    },
    [handleSubmitWithModel]
  );

  const handleButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      handleSubmitWithModel(e);
    },
    [handleSubmitWithModel]
  );

  const updatePreviewUrls = useCallback((files: FileList | null) => {
    setPreviewUrls(
      files ? Array.from(files).map((file) => URL.createObjectURL(file)) : []
    );
  }, []);

  const handleImageUpload = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        setFiles((prevFiles) => {
          const newFiles = prevFiles
            ? [...Array.from(prevFiles), ...Array.from(files)]
            : Array.from(files);
          const newFileList = new DataTransfer();
          newFiles.forEach((file) => newFileList.items.add(file));
          updatePreviewUrls(newFileList.files);
          return newFileList.files;
        });
      }
    };
    input.click();
  }, [updatePreviewUrls]);

  const handleDeleteImage = useCallback(
    (index: number) => {
      setFiles((prevFiles) => {
        if (prevFiles) {
          const newFiles = Array.from(prevFiles);
          newFiles.splice(index, 1);
          const newFileList = new DataTransfer();
          newFiles.forEach((file) => newFileList.items.add(file));
          updatePreviewUrls(newFileList.files);
          return newFileList.files;
        }
        return null;
      });
    },
    [updatePreviewUrls]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      const items = e.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          e.preventDefault();
          const file = items[i].getAsFile();
          if (file) {
            setFiles((prevFiles) => {
              const newFiles = prevFiles
                ? [...Array.from(prevFiles), file]
                : [file];
              const newFileList = new DataTransfer();
              newFiles.forEach((f) => newFileList.items.add(f));
              updatePreviewUrls(newFileList.files);
              return newFileList.files;
            });
          }
          break;
        }
      }
    },
    [updatePreviewUrls]
  );

  return {
    messagesEndRef,
    selectedModel,
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    error,
    reload,
    handleModelChange,
    handleKeyDown,
    handleButtonClick,
    inputRef,
    handleImageUpload,
    previewUrls,
    handleDeleteImage,
    handlePaste,
  };
}
