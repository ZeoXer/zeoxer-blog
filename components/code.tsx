"use client";

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import type { BundledLanguage, BundledTheme } from "shiki";

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

  if (!html) {
    return (
      <pre className="rounded-md bg-gray-100 p-3 overflow-auto">
        <code>{code}</code>
      </pre>
    );
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

function escapeHtmlToPre(s: string) {
  return `<pre><code>${s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")}</code></pre>`;
}
