import { ClockIcon, PenIcon } from "./icons";
import MarkdownDisplay from "./markdown-display";

interface ArticleContentProps {
  title: string;
  createDate: string;
  lastUpdated: string;
  content: string;
}

export const ArticleContent = ({
  title,
  lastUpdated,
  createDate,
  content,
}: ArticleContentProps) => {
  return (
    <article className="w-full max-w-2xl">
      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-warning">
          {title}
        </h1>
        <div className="grid grid-cols-1 gap-2">
          <time className="text-sm text-default-500 flex gap-1 items-center">
            <PenIcon className="w-5 inline-block" />
            撰寫時間 {createDate}
          </time>
          <time className="text-sm text-default-500 flex gap-1 items-center">
            <ClockIcon className="w-5 inline-block" />
            最後更新 {lastUpdated}
          </time>
        </div>
      </header>

      {/* Article Content */}
      <div className="prose prose-invert max-w-none">
        <div className="text-default-700 leading-relaxed">
          <MarkdownDisplay content={content} />
        </div>
      </div>
    </article>
  );
};
