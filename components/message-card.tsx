import { Message } from "ai";

interface MessageCardProps {
  msg: Message;
}

export default function MessageCard({ msg }: MessageCardProps) {
  if (msg.role === "user") {
    return (
      <div key={msg.id} className="flex justify-end my-4">
        <div className="p-2 bg-primary text-primary-foreground rounded  break-words">
          {msg.content}
        </div>
      </div>
    );
  }
  return (
    <div key={msg.id} className="flex justify-start my-4">
      <div className="p-2 bg-secondary rounded break-words">{msg.content}</div>
    </div>
  );
}
