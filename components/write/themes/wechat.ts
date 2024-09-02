import { PlatformThemes } from "../platforms";

const wechatThemes: PlatformThemes = {
  id: "wechat",
  name: "微信",
  themes: [
    {
      name: "默认",
      style: `
        body { color: #333; font-size: 16px; line-height: 1.6; }
        h1, h2, h3, h4, h5, h6 { margin-top: 1.2em; margin-bottom: 0.6em; line-height: 1.35; }
        h1 { font-size: 1.8em; } h2 { font-size: 1.6em; } h3 { font-size: 1.4em; }
        p { margin-bottom: 1em; }
        a { color: #576b95; text-decoration: none; }
        img { max-width: 100%; height: auto; }
        blockquote { padding: 15px; border-left: 3px solid #d0e5f2; color: #666; }
        code { padding: 2px 4px; border-radius: 3px; font-size: 0.9em; }
        pre { padding: 1em; overflow-x: auto; }
      `,
    },
    {
      name: "清新绿",
      style: `
        body { color: #3e3e3e; font-size: 16px; line-height: 1.6; }
        h1, h2, h3, h4, h5, h6 { margin-top: 1.2em; margin-bottom: 0.6em; line-height: 1.35; color: #07c160; }
        h1 { font-size: 1.8em; } h2 { font-size: 1.6em; } h3 { font-size: 1.4em; }
        p { margin-bottom: 1em; }
        a { color: #07c160; text-decoration: none; }
        img { max-width: 100%; height: auto; border-radius: 4px; }
        blockquote { padding: 15px; border-left: 3px solid #07c160; color: #07c160; }
        code { padding: 2px 4px; border-radius: 3px; font-size: 0.9em; color: #07c160; }
        pre { padding: 1em; overflow-x: auto; }
      `,
    },
    {
      name: "商务蓝",
      style: `
        body { color: #333; font-size: 16px; line-height: 1.6; }
        h1, h2, h3, h4, h5, h6 { margin-top: 1.2em; margin-bottom: 0.6em; line-height: 1.35; color: #1e3799; }
        h1 { font-size: 1.8em; } h2 { font-size: 1.6em; } h3 { font-size: 1.4em; }
        p { margin-bottom: 1em; }
        a { color: #1e3799; text-decoration: none; }
        img { max-width: 100%; height: auto; border-radius: 4px; }
        blockquote { padding: 15px; border-left: 3px solid #1e3799; color: #1e3799; }
        code { padding: 2px 4px; border-radius: 3px; font-size: 0.9em; color: #1e3799; }
        pre { padding: 1em; overflow-x: auto; }
      `,
    },
    {
      name: "活力橙",
      style: `
        body { color: #333; font-size: 16px; line-height: 1.6; }
        h1, h2, h3, h4, h5, h6 { margin-top: 1.2em; margin-bottom: 0.6em; line-height: 1.35; color: #f39c12; }
        h1 { font-size: 1.8em; } h2 { font-size: 1.6em; } h3 { font-size: 1.4em; }
        p { margin-bottom: 1em; }
        a { color: #f39c12; text-decoration: none; }
        img { max-width: 100%; height: auto; border-radius: 4px; }
        blockquote { padding: 15px; border-left: 3px solid #f39c12; color: #f39c12; }
        code { padding: 2px 4px; border-radius: 3px; font-size: 0.9em; color: #f39c12; }
        pre { padding: 1em; overflow-x: auto; }
      `,
    },
    {
      name: "优雅紫",
      style: `
        body { color: #333; font-size: 16px; line-height: 1.6; }
        h1, h2, h3, h4, h5, h6 { margin-top: 1.2em; margin-bottom: 0.6em; line-height: 1.35; color: #8e44ad; }
        h1 { font-size: 1.8em; } h2 { font-size: 1.6em; } h3 { font-size: 1.4em; }
        p { margin-bottom: 1em; }
        a { color: #8e44ad; text-decoration: none; }
        img { max-width: 100%; height: auto; border-radius: 4px; }
        blockquote { padding: 15px; border-left: 3px solid #8e44ad; color: #8e44ad; }
        code { padding: 2px 4px; border-radius: 3px; font-size: 0.9em; color: #8e44ad; }
        pre { padding: 1em; overflow-x: auto; }
      `,
    },
    {
      name: "海洋蓝",
      style: `
        body { color: #2c3e50; font-size: 16px; line-height: 1.6; }
        h1, h2, h3, h4, h5, h6 { margin-top: 1.2em; margin-bottom: 0.6em; line-height: 1.35; color: #2980b9; }
        h1 { font-size: 1.8em; } h2 { font-size: 1.6em; } h3 { font-size: 1.4em; }
        p { margin-bottom: 1em; }
        a { color: #2980b9; text-decoration: none; }
        img { max-width: 100%; height: auto; border-radius: 4px; }
        blockquote { padding: 15px; border-left: 3px solid #2980b9; color: #2980b9; }
        code { padding: 2px 4px; border-radius: 3px; font-size: 0.9em; color: #2980b9; }
        pre { padding: 1em; overflow-x: auto; }
      `,
    },
    {
      name: "樱花粉",
      style: `
        body { color: #5a5a5a; font-size: 16px; line-height: 1.6; }
        h1, h2, h3, h4, h5, h6 { margin-top: 1.2em; margin-bottom: 0.6em; line-height: 1.35; color: #ff69b4; }
        h1 { font-size: 1.8em; } h2 { font-size: 1.6em; } h3 { font-size: 1.4em; }
        p { margin-bottom: 1em; }
        a { color: #ff69b4; text-decoration: none; }
        img { max-width: 100%; height: auto; border-radius: 4px; }
        blockquote { padding: 15px; border-left: 3px solid #ff69b4; color: #ff69b4; }
        code { padding: 2px 4px; border-radius: 3px; font-size: 0.9em; color: #ff69b4; }
        pre { padding: 1em; overflow-x: auto; }
      `,
    },
    {
      name: "森林绿",
      style: `
        body { color: #2e7d32; background: url('https://example.com/forest.jpg') no-repeat center center fixed; background-size: cover; font-size: 16px; line-height: 1.6; }
        h1, h2, h3, h4, h5, h6 { margin-top: 1.2em; margin-bottom: 0.6em; line-height: 1.35; color: #1b5e20; }
        h1 { font-size: 1.8em; } h2 { font-size: 1.6em; } h3 { font-size: 1.4em; }
        p { margin-bottom: 1em; }
        a { color: #1b5e20; text-decoration: none; }
        img { max-width: 100%; height: auto; border-radius: 4px; }
        blockquote { padding: 15px; border-left: 3px solid #1b5e20; color: #1b5e20; }
        code { padding: 2px 4px; border-radius: 3px; font-size: 0.9em; color: #1b5e20; }
        pre { padding: 1em; overflow-x: auto; }
      `,
    },
    {
      name: "极简黑白",
      style: `
        body { color: #000; font-size: 16px; line-height: 1.6; }
        h1, h2, h3, h4, h5, h6 { margin-top: 1.5em; margin-bottom: 0.8em; line-height: 1.3; }
        h1 { font-size: 2em; border-bottom: 1px solid #000; padding-bottom: 0.3em; }
        h2 { font-size: 1.5em; } h3 { font-size: 1.3em; }
        p { margin-bottom: 1.2em; }
        a { color: #000; text-decoration: underline; }
        img { max-width: 100%; height: auto; border: 1px solid #000; }
        blockquote { border-left: 2px solid #000; padding-left: 1em; font-style: italic; }
        code { padding: 2px 4px; font-family: monospace; }
        pre { padding: 1em; overflow-x: auto; border: 1px solid #000; }
      `,
    },
    {
      name: "暖阳金秋",
      style: `
        body { color: #5d4037; font-size: 16px; line-height: 1.6; }
        h1, h2, h3, h4, h5, h6 { margin-top: 1.2em; margin-bottom: 0.6em; line-height: 1.35; color: #e65100; }
        h1 { font-size: 1.8em; } h2 { font-size: 1.6em; } h3 { font-size: 1.4em; }
        p { margin-bottom: 1em; }
        a { color: #ff6f00; text-decoration: none; border-bottom: 1px dashed #ff6f00; }
        img { max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        blockquote { padding: 15px; border-left: 3px solid #ffb74d; color: #795548; }
        code { padding: 2px 4px; border-radius: 3px; font-size: 0.9em; color: #e65100; }
        pre { padding: 1em; overflow-x: auto; border-radius: 4px; }
      `,
    },
    {
      name: "科技未来",
      style: `
        body { color: #c9d1d9; font-size: 16px; line-height: 1.6; }
        h1, h2, h3, h4, h5, h6 { margin-top: 1.2em; margin-bottom: 0.6em; line-height: 1.35; color: #58a6ff; }
        h1 { font-size: 1.8em; } h2 { font-size: 1.6em; } h3 { font-size: 1.4em; }
        p { margin-bottom: 1em; }
        a { color: #58a6ff; text-decoration: none; border-bottom: 1px solid #58a6ff; }
        img { max-width: 100%; height: auto; border: 2px solid #30363d; border-radius: 4px; }
        blockquote { padding: 15px; border-left: 3px solid #30363d; color: #8b949e; }
        code { padding: 2px 4px; border-radius: 3px; font-size: 0.9em; color: #58a6ff; background-color: #0d1117; }
        pre { padding: 1em; overflow-x: auto; border: 1px solid #30363d; background-color: #0d1117; }
      `,
    },
    {
      name: "轻柔粉彩",
      style: `
        body { color: #5a5a5a; font-size: 16px; line-height: 1.6; }
        h1, h2, h3, h4, h5, h6 { margin-top: 1.2em; margin-bottom: 0.6em; line-height: 1.35; color: #db7093; }
        h1 { font-size: 1.8em; } h2 { font-size: 1.6em; } h3 { font-size: 1.4em; }
        p { margin-bottom: 1em; }
        a { color: #ff69b4; text-decoration: none; border-bottom: 1px dotted #ff69b4; }
        img { max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
        blockquote { padding: 15px; border-left: 3px solid #ffb6c1; color: #8e4585; }
        code { padding: 2px 4px; border-radius: 3px; font-size: 0.9em; color: #db7093; }
        pre { padding: 1em; overflow-x: auto; border-radius: 8px; }
      `,
    },

    {
      name: "复古纸张",
      style: `
        body { color: #5d4037; background: url('https://example.com/vintage-paper.jpg') no-repeat center center fixed; background-size: cover; font-size: 16px; line-height: 1.6; }
        h1, h2, h3, h4, h5, h6 { margin-top: 1.2em; margin-bottom: 0.6em; line-height: 1.35; color: #3e2723; }
        h1 { font-size: 1.8em; } h2 { font-size: 1.6em; } h3 { font-size: 1.4em; }
        p { margin-bottom: 1em; }
        a { color: #3e2723; text-decoration: none; }
        img { max-width: 100%; height: auto; border-radius: 4px; }
        blockquote { padding: 15px; border-left: 3px solid #3e2723; color: #3e2723; }
        code { padding: 2px 4px; border-radius: 3px; font-size: 0.9em; color: #3e2723; }
        pre { padding: 1em; overflow-x: auto; }
      `,
    },
  ],
};

export default wechatThemes;
