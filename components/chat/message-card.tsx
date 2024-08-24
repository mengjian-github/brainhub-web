import { Message } from "ai";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MessageCardProps {
  msg: Message;
}

export default function MessageCard({ msg }: MessageCardProps) {
  const userStyles =
    "p-3 bg-primary text-white rounded-lg shadow-md max-w-full prose";
  const assistantStyles =
    "p-3 bg-secondary text-gray-800 rounded-lg shadow-md max-w-full prose";

  return (
    <div
      className={`flex ${
        msg.role === "user" ? "justify-end" : "justify-start"
      } my-4`}
    >
      <div className={msg.role === "user" ? userStyles : assistantStyles}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  language={match[1]}
                  PreTag="div"
                  style={oneDark}
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
