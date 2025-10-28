"use client";

import { Button } from "@heroui/button";
import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import type { BundledLanguage, BundledTheme } from "shiki";
import { CheckIcon, CopyIcon } from "./icons";

type Props = {
  code: string;
  lang?: BundledLanguage;
  theme?: BundledTheme;
};

export default function Code({
  code,
  lang = "javascript",
  theme = "github-dark",
}: Props) {
  const [html, setHtml] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const out = await codeToHtml(code, { lang, theme });
        if (mounted) setHtml(out);
      } catch (e) {
        if (mounted) setHtml(escapeHtmlToPre(code));
      }
    })();

    return () => {
      mounted = false;
    };
  }, [code, lang, theme]);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    alertCopySuccess();
  };

  const alertCopySuccess = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (!html) {
    return (
      <pre className="rounded-md bg-gray-100 p-3 overflow-auto">
        <code>{code}</code>
      </pre>
    );
  }

  return (
    <div className="relative">
      <Button
        isIconOnly
        variant="flat"
        className="absolute right-2 top-2"
        onPress={copyCode}
      >
        {copied ? (
          <CheckIcon className="w-5 animate-appearance-in" />
        ) : (
          <CopyIcon className="w-5 animate-appearance-in" />
        )}
      </Button>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

function escapeHtmlToPre(s: string) {
  return `<pre><code>${s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")}</code></pre>`;
}
