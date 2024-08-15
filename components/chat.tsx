"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <div className="w-1/2 mx-auto p-4 flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.length === 0 ? (
          <Empty />
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="p-2 my-2 bg-gray-200 rounded">
              {msg}
            </div>
          ))
        )}
      </div>
      <div className="flex space-x-2">
        <Input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-l"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage}>发送</Button>
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
