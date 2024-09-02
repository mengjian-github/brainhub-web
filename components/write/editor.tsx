"use client";

import { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import Vditor from "vditor";
import "vditor/dist/index.css";

// 修改接口定义
export interface EditorRef {
  getHtml: () => string;
  getMarkdown: () => string; // 将 getValue 改为 getMarkdown
  setMarkdown: (markdown: string) => void; // 新增方法
}

const Editor = forwardRef<EditorRef>((props, ref) => {
  const [vd, setVd] = useState<Vditor>();

  // 使用 useImperativeHandle 暴露方法给外部
  useImperativeHandle(ref, () => ({
    getHtml: () => vd?.getHTML() || "",
    getMarkdown: () => vd?.getValue() || "", // 将 getValue 改为 getMarkdown
    setMarkdown: (markdown: string) => {
      if (vd) {
        vd.setValue(markdown); // 新增方法实现
      }
    },
  }));

  useEffect(() => {
    const vditor = new Vditor("vditor", {
      placeholder: "请输入内容",
      after: () => {
        setVd(vditor);
      },
      mode: "wysiwyg",
      icon: "material",
      tab: "    ",
      height: "calc(100vh - 100px)",
      preview: {
        markdown: {
          toc: true,
          autoSpace: true,
        },
        hljs: {
          lineNumber: true,
        },
      },
      toolbar: [
        "emoji",
        "headings",
        "bold",
        "italic",
        "strike",
        "|",
        "line",
        "|",
        "link",
        "table",
        "quote",
        "|",
        "list",
        "ordered-list",
        "check",
        "|",
        "code",
        "inline-code",
        "|",
        "undo",
        "redo",
        "|",
        "upload",
        "|",
        "outline",
        "|",
        "edit-mode",
        "code-theme",
        "content-theme",
        "|",
        "export",
        "fullscreen",
      ],
    });

    // 清理效果
    return () => {
      vd?.destroy();
      setVd(undefined);
    };
  }, []);

  return (
    <div
      id="vditor"
      className="vditor"
      style={{ height: "calc(100vh - 100px)" }}
    ></div>
  );
});

Editor.displayName = "Editor";

export default Editor;
