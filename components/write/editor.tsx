"use client";

import { useEffect, useState } from "react";
import Vditor from "vditor";
import "vditor/dist/index.css";

export default function Editor() {
  const [vd, setVd] = useState<Vditor>();
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
    // Clear the effect
    return () => {
      vd?.destroy();
      setVd(undefined);
    };
  }, []);
  return <div id="vditor" className="vditor" />;
}
