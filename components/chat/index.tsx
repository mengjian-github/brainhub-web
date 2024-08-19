"use client";

import { LoaderIcon, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "./index.css";

import useChat from "@/hooks/use-chat";
import ModelSelector from "./model-selector";
import MessageCard from "./message-card";
import { Empty } from "./empty";
import { useSidebar } from "@/hooks/use-sidebar";
import useIsPC from "@/hooks/use-is-pc";

function getInnerHeight() {
  return window.innerHeight;
}

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
  const { isOpen } = useSidebar();
  const isPC = useIsPC();

  return (
    <div className="h-full w-full">
      <div className="chat-scroll-container overflow-y-auto">
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
      <div
        className="fixed-bottom"
        style={{
          width: isOpen && isPC ? "calc(100% - 18rem)" : "calc(100% - 2rem)",
        }}
      >
        <div className="flex mb-2">
          <ModelSelector
            defaultValue={selectedModel}
            value={selectedModel}
            onValueChange={handleModelChange}
          />
        </div>
        <div className="flex space-x-2">
          <Input
            ref={inputRef}
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-l"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            enterKeyHint="send"
          />
          <Button onClick={handleButtonClick} size="icon">
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
