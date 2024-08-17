import { Message } from "ai";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface MessageCardProps {
  msg: Message;
}

export default function MessageCard({ msg }: MessageCardProps) {
  const userStyles =
    "p-3 bg-primary text-white rounded-lg shadow-md max-w-full";
  const assistantStyles =
    "p-3 bg-secondary text-gray-800 rounded-lg shadow-md max-w-full";

  return (
    <div
      className={`flex ${
        msg.role === "user" ? "justify-end" : "justify-start"
      } my-4`}
      style={{
        maxWidth: "calc(100vw - 2rem)",
      }}
    >
      <div className={msg.role === "user" ? userStyles : assistantStyles}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    padding: "10px",
                    borderRadius: "5px",
                    backgroundColor: "#fdf6e3",
                    fontSize: "0.9em", // 调小字体大小
                  }}
                  {...(props as any)}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {msg.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
