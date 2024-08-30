import wechatThemes from "./themes/wechat";

export type PlatformId =
  | "wechat"
  | "zhihu"
  | "juejin"
  | "xiaohongshu"
  | "twitter";

export interface Platform {
  id: PlatformId;
  name: string;
  url: string;
  disabled: boolean;
  themes?: string[];
}

export interface Theme {
  name: string;
  style: string;
}

export interface PlatformThemes {
  id: PlatformId;
  name: string;
  themes: Theme[];
}

export const platforms: Platform[] = [
  {
    id: "wechat",
    name: "微信",
    url: "https://mp.weixin.qq.com",
    disabled: false,
    themes: wechatThemes.themes.map((theme) => theme.name),
  },
  {
    id: "zhihu",
    name: "知乎",
    url: "https://www.zhihu.com",
    disabled: false,
  },
  {
    id: "juejin",
    name: "掘金",
    url: "https://juejin.cn",
    disabled: false,
  },
  {
    id: "xiaohongshu",
    name: "小红书",
    url: "https://www.xiaohongshu.com",
    disabled: true,
  },
  {
    id: "twitter",
    name: "Twitter",
    url: "https://twitter.com",
    disabled: true,
  },
];

export const getPlatform = (id: PlatformId): Platform | undefined => {
  return platforms.find((p) => p.id === id);
};

export const getThemes = (id: PlatformId): string[] => {
  return getPlatform(id)?.themes || [];
};
