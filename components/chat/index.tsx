import React from "react";
import useChat from "@/hooks/use-chat";
import Header from "./header";
import MessageList from "./message-list";
import Footer from "./footer";

export default function Chat() {
  const {
    messagesEndRef,
    selectedModel,
    messages,
    input,
    handleInputChange,
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
  } = useChat();

  return (
    <div className="flex flex-col h-full pb-20 lg:pb-0">
      <Header />
      <MessageList
        messages={messages}
        isLoading={isLoading}
        error={error}
        onStop={stop}
        onRetry={reload}
        messagesEndRef={messagesEndRef}
      />
      <Footer
        selectedModel={selectedModel}
        input={input}
        previewUrls={previewUrls}
        onModelChange={handleModelChange}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onButtonClick={handleButtonClick}
        onImageUpload={handleImageUpload}
        onDeleteImage={handleDeleteImage}
        onPaste={handlePaste}
        inputRef={inputRef}
      />
    </div>
  );
}
