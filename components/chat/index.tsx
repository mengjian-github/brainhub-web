"use client";

import { LoaderIcon, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./index.css";

import useChat from "@/hooks/use-chat";
import ModelSelector from "./model-selector";
import MessageCard from "./message-card";
import { Empty } from "./empty";
import useIsPC from "@/hooks/use-is-pc";
import { Textarea } from "../ui/textarea";

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
      <div className="fixed-bottom">
        <div className="flex mb-2">
          <ModelSelector
            defaultValue={selectedModel}
            value={selectedModel}
            onValueChange={handleModelChange}
          />
        </div>
        <div className="relative flex-1">
          <Textarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            className="w-full p-2 pr-12 border border-gray-300 rounded"
            onKeyDown={handleKeyDown}
            placeholder="请输入内容，shift+回车换行，回车发送"
            enterkeyhint="send"
          />
          <Button
            onClick={handleButtonClick}
            size="icon"
            variant="ghost"
            className="absolute bottom-0 right-0 hover:bg-transparent"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
