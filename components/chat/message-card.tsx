import { Message } from "ai";
import React from "react";
import ImagePreview from "../image-preview";
import Markdown from "../markdown";

interface MessageCardProps {
  msg: Message;
}

export default function MessageCard({ msg }: MessageCardProps) {
  const commonStyles = "p-4 rounded-lg shadow-md max-w-full";
  const userStyles = `${commonStyles} bg-primary text-white ml-auto`;
  const assistantStyles = `${commonStyles} custom-markdown bg-secondary text-gray-800 mr-auto`;

  const images =
    msg.experimental_attachments
      ?.filter(
        (attachment) => attachment.contentType?.startsWith("image/") ?? false
      )
      .map((attachment) => ({ src: attachment.url ?? "" })) || [];

  return (
    <>
      <div className="flex flex-col my-4 max-w-full">
        <div
          className={`${msg.role === "user" ? userStyles : assistantStyles}`}
        >
          <Markdown>{msg.content}</Markdown>
          <ImagePreview images={images} />
        </div>
      </div>
    </>
  );
}
