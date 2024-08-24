import { Message } from "ai";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ImagePreview from "../image-preview";

interface MessageCardProps {
  msg: Message;
}

export default function MessageCard({ msg }: MessageCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const commonStyles = "p-3 rounded-lg shadow-md prose max-w-full";
  const userStyles = `${commonStyles} bg-primary text-white ml-auto`;
  const assistantStyles = `${commonStyles} bg-secondary text-gray-800 mr-auto`;

  const images =
    msg.experimental_attachments
      ?.filter(
        (attachment) => attachment.contentType?.startsWith("image/") ?? false
      )
      .map((attachment) => ({ src: attachment.url ?? "" })) || [];

  return (
    <>
      <div className="flex flex-col my-4 max-w-full">
        <div className={msg.role === "user" ? userStyles : assistantStyles}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            components={{
              code({ node, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <div className="overflow-x-auto">
                    <SyntaxHighlighter
                      language={match[1]}
                      PreTag="div"
                      style={oneDark as any}
                      {...(props as any)}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  </div>
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
          <ImagePreview images={images} />
        </div>
      </div>
    </>
  );
}
