"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { CSSProperties } from "react";
import { useTheme } from "next-themes";
import Code from "./code";
import { BundledLanguage } from "shiki";
import { clsx } from "clsx";

const MarkdownDisplay = ({ content }: { content: string }) => {
  const { theme } = useTheme();

  const hTagStyle = (fontSize: string): CSSProperties => {
    return {
      fontSize: fontSize,
      fontWeight: "700",
      lineHeight: "2.25",
    };
  };

  return (
    <Markdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        h1(props) {
          const { children, ...rest } = props;
          return (
            <h1 style={hTagStyle("30px")} id={children?.toString()} {...rest}>
              {children}
            </h1>
          );
        },
        h2(props) {
          const { children, ...rest } = props;
          return (
            <h2 style={hTagStyle("28px")} id={children?.toString()} {...rest}>
              {children}
            </h2>
          );
        },
        h3(props) {
          const { children, ...rest } = props;
          return (
            <h3 style={hTagStyle("26px")} id={children?.toString()} {...rest}>
              {children}
            </h3>
          );
        },
        h4(props) {
          const { children, ...rest } = props;
          return (
            <h4 style={hTagStyle("24px")} id={children?.toString()} {...rest}>
              {children}
            </h4>
          );
        },
        h5(props) {
          const { children, ...rest } = props;
          return (
            <h5 style={hTagStyle("22px")} id={children?.toString()} {...rest}>
              {children}
            </h5>
          );
        },
        h6(props) {
          const { children, ...rest } = props;
          return (
            <h6 style={hTagStyle("20px")} id={children?.toString()} {...rest}>
              {children}
            </h6>
          );
        },
        p(props) {
          return <p className="text-lg leading-loose" {...props} />;
        },
        a(props) {
          return (
            <a
              {...props}
              className="text-sky-600 md:hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {props.children}
            </a>
          );
        },
        li(props) {
          return <li className="list-disc ml-6" {...props} />;
        },
        img(props) {
          return <img className="my-8 mx-auto" {...props} />;
        },
        code(props) {
          const { children, className, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          const codeContent = String(children).startsWith("\n")
            ? String(children).substring(1).replace(/\n\n/g, "\n")
            : String(children).replace(/\n\n/g, "\n");

          return match ? (
            <Code
              code={codeContent}
              lang={match[1] ? (match[1] as BundledLanguage) : "markdown"}
              theme={theme === "dark" ? "github-dark" : "one-light"}
            />
          ) : (
            <code
              {...rest}
              className={clsx("rounded-sm bg-default-300 p-0.5", className)}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {content.replace(/\n/g, "\n\n")}
    </Markdown>
  );
};

export default MarkdownDisplay;
