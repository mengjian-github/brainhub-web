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

interface EditorProps {
  onChange?: (value: string) => void;
  onReady?: () => void; // 新增
  initialContent?: string; // 新增：接受初始内容
}

const Editor = forwardRef<EditorRef, EditorProps>(
  ({ onChange, onReady, initialContent }, ref) => {
    const [vd, setVd] = useState<Vditor>();

    // 使用 useImperativeHandle 暴露方法给外部
    useImperativeHandle(ref, () => ({
      getHtml: () => vd?.getHTML() || "",
      getMarkdown: () => vd?.getValue() || "",
      setMarkdown: (markdown: string) => {
        if (vd) {
          vd.setValue(markdown);
        }
      },
    }));

    useEffect(() => {
      if (!vd) {
        const vditor = new Vditor("vditor", {
          placeholder: "请输入内容",
          cache: {
            enable: false,
          },
          after: () => {
            vditor.clearCache();
            setVd(vditor);
            onReady && onReady(); // 在编辑器初始化完成后调用 onReady
            if (initialContent) {
              vditor.setValue(initialContent);
            }
          },
          input: (value) => {
            onChange && onChange(value);
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
          value: "",
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
      }

      return () => {
        vd?.destroy();
        setVd(undefined);
      };
    }, []);

    // 新增：监听 initialContent 的变化
    useEffect(() => {
      if (vd && initialContent !== undefined) {
        vd.setValue(initialContent);
      }
    }, [initialContent, vd]);

    return (
      <div
        id="vditor"
        className="vditor"
        style={{ height: "calc(100vh - 100px)" }}
      ></div>
    );
  }
);

Editor.displayName = "Editor";

export default Editor;
