"use client";

import { LoaderIcon } from "lucide-react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";

import "./chat.css";
import MessageCard from "./message-card";

export default function Chat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    error,
    reload,
  } = useChat({
    api: `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ai/chat`,
  });

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-2/3 mx-auto p-4 flex flex-col h-screen">
      <div className="chat-scroll-container flex-1 overflow-y-auto mb-4">
        {messages.length === 0 ? (
          <Empty />
        ) : (
          messages.map((msg) => <MessageCard msg={msg} />)
        )}

        {isLoading && (
          <div className="flex items-center space-x-2">
            <LoaderIcon className="animate-spin" />
            <Button variant="secondary" onClick={() => stop()}>
              终止
            </Button>
          </div>
        )}

        {error && (
          <div className="flex items-center space-x-2">
            <div>发生了一些错误。</div>
            <Button onClick={() => reload()}>重试</Button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
      <div className="flex space-x-2">
        <Input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-l"
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (!e.nativeEvent.isComposing && e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <Button onClick={handleSubmit}>发送</Button>
      </div>
    </div>
  );
}

function Empty() {
  return (
    <div>
      <h2 className="text-3xl mt-24">你好！</h2>
      <p className="text-gray-500 mt-2">我是你的专属AI助手，快来和我聊天吧~</p>
    </div>
  );
}
