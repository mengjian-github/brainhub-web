import { useState, useEffect, useRef } from "react";
import Preview from "./preview";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { platforms, PlatformId, getThemes, getPlatform } from "./platforms";
import toast from "react-hot-toast";

interface DistributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    markdown: string;
    html: string;
  };
}

export default function DistributionModal({
  isOpen,
  onClose,
  content,
}: DistributionModalProps) {
  const [selectedPlatformId, setSelectedPlatformId] =
    useState<PlatformId>("wechat");
  const [selectedTheme, setSelectedTheme] = useState("默认");
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedPlatformId("wechat");
      setSelectedTheme("默认");
    }
  }, [isOpen]);

  const handleCopy = () => {
    if (previewRef.current) {
      const previewContent =
        previewRef.current.querySelector("#preview-content");
      if (previewContent) {
        const range = document.createRange();
        range.selectNodeContents(previewContent);
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);

          try {
            document.execCommand("copy");
            toast.success("内容已复制到剪贴板");
          } catch (err) {
            console.error("复制失败:", err);
            toast.error("复制失败，请手动复制内容");
          }

          selection.removeAllRanges();
        }
      }
    }
  };

  const handleJump = () => {
    const platform = getPlatform(selectedPlatformId);
    if (platform && !platform.disabled) {
      window.open(platform.url, "_blank");
    } else {
      toast.error(`${platform?.name || selectedPlatformId} 发布页面暂未实现`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>选择分发平台</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
          <div className="grid gap-4 py-4">
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <Button
                  key={platform.id}
                  onClick={() =>
                    !platform.disabled && setSelectedPlatformId(platform.id)
                  }
                  variant={
                    selectedPlatformId === platform.id ? "default" : "outline"
                  }
                  size="sm"
                  disabled={platform.disabled}
                >
                  {platform.name}
                </Button>
              ))}
            </div>
            {selectedPlatformId === "wechat" && (
              <div>
                <h4 className="font-medium mb-2">选择主题</h4>
                <div className="flex flex-wrap gap-2">
                  {getThemes(selectedPlatformId).map((theme) => (
                    <Button
                      key={theme}
                      onClick={() => setSelectedTheme(theme)}
                      variant={selectedTheme === theme ? "default" : "outline"}
                      size="sm"
                    >
                      {theme}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            <div ref={previewRef}>
              <Preview
                content={content.html}
                platformId={selectedPlatformId}
                theme={selectedTheme}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={handleCopy} variant="outline">
            复制内容
          </Button>
          <Button onClick={handleJump}>跳转发布</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
