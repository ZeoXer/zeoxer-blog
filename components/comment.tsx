import { useTheme } from "next-themes";
import { giscusConfig } from "@/config/giscus";
import Giscus from "@giscus/react";

export const Comment = () => {
  const { theme } = useTheme();

  return (
    <div id="comment" className="mx-auto max-w-prose py-6">
      <Giscus
        repo={giscusConfig.repo}
        repoId={giscusConfig.repoId}
        category={giscusConfig.category}
        categoryId={giscusConfig.categoryId}
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        loading="lazy"
        theme={theme}
      />
    </div>
  );
};
