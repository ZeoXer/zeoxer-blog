"use client";

import { useRef, ClipboardEvent, useState } from "react";
import CodeMirror, { EditorView, ViewUpdate } from "@uiw/react-codemirror";
import { vscodeLight, vscodeDark } from "@uiw/codemirror-theme-vscode";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { useTheme } from "next-themes";
import { uploadImageToR2 } from "@/data/image";
import { addToast } from "@heroui/toast";
import { Chip } from "@heroui/chip";
import { Spinner } from "@heroui/spinner";

interface CodeEditorProps {
  content: string;
  setContent: (value: string) => void;
}

const insertImageUrl = (ref: ViewUpdate, url: string) => {
  const view = ref.view;
  const startPos = view.state.selection.main.head;
  view.dispatch({
    changes: { from: startPos, insert: `![image](${url})` },
    selection: {
      anchor: startPos + url.length + 10,
      head: startPos + url.length + 10,
    },
  });
};

const getRandomNamedFile = (file: File) => {
  const getExt = (f: File) => {
    if (f.name && f.name.includes(".")) {
      return f.name.split(".").pop()!.toLowerCase();
    }
    const mimeExt = (f.type || "png").split("/").pop() || "png";
    return mimeExt === "jpeg" ? "jpg" : mimeExt;
  };

  const randomHex =
    typeof crypto !== "undefined"
      ? Array.from(crypto.getRandomValues(new Uint8Array(6)))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("")
      : Math.random().toString(36).slice(2, 8);

  const ext = getExt(file);
  const uniqueName = `image-${Date.now()}-${randomHex}.${ext}`;
  return new File([file], uniqueName, { type: file.type });
};

export const CodeEditor = ({ content, setContent }: CodeEditorProps) => {
  const [isImgUploading, setIsImgUploading] = useState(false);
  const editorRef = useRef<ViewUpdate | null>(null);

  const { theme } = useTheme();
  const editorTheme = theme === "dark" ? vscodeDark : vscodeLight;

  const handleImagePaste = async (ref: ViewUpdate, event: ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (!items) return;

    let file: File | null = null;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith("image/")) {
        file = items[i].getAsFile();
        break;
      }
    }

    if (!file) return true;
    file = getRandomNamedFile(file);

    setIsImgUploading(true);

    try {
      const { status } = await uploadImageToR2(file);
      if (status === 1) {
        insertImageUrl(
          ref,
          `${process.env.NEXT_PUBLIC_R2_BUCKET_URL}/${file.name}`
        );
      }
    } catch (error) {
      addToast({
        title: "圖片上傳失敗",
        description: String(error),
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        color: "danger",
      });
    } finally {
      setIsImgUploading(false);
    }
  };

  return (
    <div className="relative">
      <CodeMirror
        value={content}
        theme={editorTheme}
        minHeight="300px"
        maxHeight="650px"
        className="overflow-y-auto"
        extensions={[
          markdown({
            base: markdownLanguage,
            codeLanguages: languages,
          }),
          EditorView.lineWrapping,
        ]}
        onChange={setContent}
        ref={editorRef}
        onPaste={(e) => handleImagePaste(editorRef.current!, e)}
      />
      {isImgUploading && (
        <Chip
          color="secondary"
          variant="solid"
          className="absolute bottom-2 right-3 animate-appearance-in"
        >
          <div className="flex items-center gap-1">
            <span>圖片上傳中</span>
            <Spinner size="sm" color="default" variant="dots" />
          </div>
        </Chip>
      )}
    </div>
  );
};
