import React from "react";
import LoadingIndicator from "./loading-indicator";
import ErrorMessage from "./error-message";
import MessageCard from "./message-card";
import WelcomeMessage from "./welcome-message";

interface MessageListProps {
  messages: any[];
  isLoading: boolean;
  error: any;
  onStop: () => void;
  onRetry: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export default function MessageList({
  messages,
  isLoading,
  error,
  onStop,
  onRetry,
  messagesEndRef,
}: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.length === 0 ? (
        <WelcomeMessage />
      ) : (
        messages.map((msg) => <MessageCard key={msg.id} msg={msg} />)
      )}
      {isLoading && <LoadingIndicator onStop={onStop} />}
      {error && <ErrorMessage onRetry={onRetry} />}
      <div ref={messagesEndRef} />
    </div>
  );
}
