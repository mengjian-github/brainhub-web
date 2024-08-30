import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMarkdownStyle, defaultMarkdownStyle } from "./themes";
import { PlatformId, getPlatform } from "./platforms";

export default function Preview({
  content,
  platformId,
  theme,
}: {
  content: string;
  platformId: PlatformId;
  theme: string;
}) {
  const platform = getPlatform(platformId);
  const platformName = platform?.name || platformId;

  const themeStyle = getMarkdownStyle(platformId, theme);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{platformName} 预览</CardTitle>
      </CardHeader>
      <CardContent>
        <div id="preview-container" className="max-w-[375px] mx-auto bg-white">
          <div className="border-[14px] border-gray-800 rounded-[2.5rem] overflow-hidden shadow-xl">
            <div className="h-[60px] bg-gray-800 relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-[18px] bg-gray-700 rounded-full"></div>
            </div>
            <div className="h-[667px] overflow-y-auto">
              <style>{`
                #preview-content {
                  ${defaultMarkdownStyle}
                  ${themeStyle}
                }
              `}</style>
              <div
                id="preview-content"
                className="p-4"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
            <div className="h-[4px] bg-gray-800"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
