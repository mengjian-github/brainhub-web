import { useState } from "react";
import { platforms } from "./platforms";

export default function PlatformDistribution({
  onPlatformsChange,
}: {
  onPlatformsChange: (platforms: string[]) => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);

  const togglePlatform = (platform: string) => {
    const newSelected = selected.includes(platform)
      ? selected.filter((p) => p !== platform)
      : [...selected, platform];
    setSelected(newSelected);
    onPlatformsChange(newSelected);
  };

  return (
    <div className="p-4 border-t">
      <h3 className="text-lg font-semibold mb-2">选择分发平台</h3>
      <div className="flex flex-wrap gap-2">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => togglePlatform(platform.id)}
            className={`px-3 py-1 rounded ${
              selected.includes(platform.id)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {platform.name}
          </button>
        ))}
      </div>
    </div>
  );
}
