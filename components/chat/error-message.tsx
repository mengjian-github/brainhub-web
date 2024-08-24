import { Button } from "@/components/ui/button";

interface ErrorMessageProps {
  onRetry: () => void;
}

export default function ErrorMessage({ onRetry }: ErrorMessageProps) {
  return (
    <div className="flex items-center space-x-2">
      <div>发生了一些错误。</div>
      <Button variant="secondary" onClick={onRetry}>
        重试
      </Button>
    </div>
  );
}
