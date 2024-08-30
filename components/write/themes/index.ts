import { PlatformId } from "../platforms";
import wechatThemes from "./wechat";

export const getMarkdownStyle = (
  platformId: PlatformId,
  themeName: string
): string => {
  if (platformId === "wechat") {
    const theme = wechatThemes.themes.find((t) => t.name === themeName);
    return theme?.style || "";
  }
  return "";
};

export const defaultMarkdownStyle = `
  h1, h2, h3, h4, h5, h6 { margin-top: 1em; margin-bottom: 0.5em; font-weight: bold; }
  h1 { font-size: 2em; } h2 { font-size: 1.5em; } h3 { font-size: 1.17em; }
  p { margin-bottom: 1em; }
  ul, ol { margin-bottom: 1em; padding-left: 2em; }
  li { margin-bottom: 0.5em; }
  a { color: #0366d6; text-decoration: none; }
  a:hover { text-decoration: underline; }
  code { background-color: #f6f8fa; padding: 0.2em 0.4em; border-radius: 3px; }
  pre { background-color: #f6f8fa; padding: 1em; overflow-x: auto; }
  blockquote { border-left: 0.25em solid #dfe2e5; color: #6a737d; padding-left: 1em; }
  img { max-width: 100%; height: auto; }
`;
