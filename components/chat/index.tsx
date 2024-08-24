"use client";

import { LoaderIcon, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import "./index.css";

import useChat from "@/hooks/use-chat";
import ModelSelector from "./model-selector";
import MessageCard from "./message-card";

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
  } = useChat();

  return (
    <div className="h-full w-full flex flex-col">
      <header className="p-4 border-b">
        <h2 className="text-lg font-semibold">AI助手</h2>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p>欢迎使用AI助手,请输入您的问题或需求。</p>
          </div>
        ) : (
          messages.map((msg) => <MessageCard key={msg.id} msg={msg} />)
        )}

        {isLoading && <LoadingIndicator onStop={stop} />}
        {error && <ErrorMessage onRetry={reload} />}

        <div ref={messagesEndRef} />
      </main>
      <footer className="border-t p-4">
        <ModelSelector
          value={selectedModel}
          onValueChange={handleModelChange}
          className="mb-2 w-48"
        />
        <div className="relative">
          <Textarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full pr-12 resize-none"
            placeholder="输入您的问题 (Shift+Enter换行)"
            rows={2}
            enterkeyhint="send"
          />
          <Button
            onClick={handleButtonClick}
            size="icon"
            variant="ghost"
            className="absolute right-2 bottom-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </footer>
    </div>
  );
}

function LoadingIndicator({ onStop }: { onStop: () => void }) {
  return (
    <div className="flex items-center space-x-2">
      <LoaderIcon className="animate-spin" />
      <Button variant="secondary" onClick={onStop}>
        终止
      </Button>
    </div>
  );
}

function ErrorMessage({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex items-center space-x-2">
      <div>发生了一些错误。</div>
      <Button variant="secondary" onClick={onRetry}>
        重试
      </Button>
    </div>
  );
}
