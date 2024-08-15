"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useChat as useAIChat } from "ai/react";

export default function useChat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedModel, setSelectedModel] = useState<string>("");

  useEffect(() => {
    const storedModel = localStorage.getItem("selectedModel");
    if (storedModel) {
      setSelectedModel(storedModel);
    } else {
      setSelectedModel("claude-3-5-sonnet");
    }
  }, []);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    error,
    reload: originReload,
  } = useAIChat({
    api: `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ai/chat`,
  });

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleModelChange = useCallback(
    (value: string) => {
      setSelectedModel(value);
      localStorage.setItem("selectedModel", value);
    },
    [setSelectedModel]
  );

  const modelRequestBody = {
    body: {
      model: selectedModel,
    },
  };

  const reload = () => {
    originReload(modelRequestBody);
  };

  const handleSubmitWithModel = useCallback(
    (e: React.SyntheticEvent) => {
      handleSubmit(e, modelRequestBody);
    },
    [selectedModel, handleSubmit]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!e.nativeEvent.isComposing && e.key === "Enter") {
        e.preventDefault();
        handleSubmitWithModel(e);
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
  };
}
