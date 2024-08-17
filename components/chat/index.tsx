"use client";

import { LoaderIcon, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "./index.css";

import useChat from "@/hooks/use-chat";
import ModelSelector from "./model-selector";
import MessageCard from "./message-card";
import { Empty } from "./empty";

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
  } = useChat();

  return (
    <div className="w-full sm:w-2/3 mx-auto p-4 flex flex-col h-screen">
      <div className="chat-scroll-container flex-1 overflow-y-auto mb-4">
        {messages.length === 0 ? (
          <Empty />
        ) : (
          messages.map((msg) => <MessageCard key={msg.id} msg={msg} />)
        )}

        {isLoading && (
          <div className="flex items-center space-x-2">
            <LoaderIcon className="animate-spin" />
            <Button variant="secondary" onClick={stop}>
              终止
            </Button>
          </div>
        )}

        {error && (
          <div className="flex items-center space-x-2">
            <div>发生了一些错误。</div>
            <Button variant="secondary" onClick={() => reload()}>
              重试
            </Button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
      <div className="flex mb-2">
        <ModelSelector
          defaultValue={selectedModel}
          value={selectedModel}
          onValueChange={handleModelChange}
        />
      </div>
      <div className="flex space-x-2">
        <Input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-l"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={handleButtonClick} size="icon">
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
