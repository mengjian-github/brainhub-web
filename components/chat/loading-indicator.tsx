import { LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoadingIndicatorProps {
  onStop: () => void;
}

export default function LoadingIndicator({ onStop }: LoadingIndicatorProps) {
  return (
    <div className="flex items-center space-x-2">
      <LoaderIcon className="animate-spin" />
      <Button variant="secondary" onClick={onStop}>
        终止
      </Button>
    </div>
  );
}
