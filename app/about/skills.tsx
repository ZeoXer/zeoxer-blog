"use client";

import { siteConfig } from "@/config/site";
import { IconCloud } from "@/components/ui/icon-cloud";

export const Skills = () => {
  const allSlugs = [
    ...siteConfig.skills.backend,
    ...siteConfig.skills.frontend,
    ...siteConfig.skills.tool,
    ...siteConfig.skills.service,
  ].map((s) => s.iconSlug);

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-foreground">相關技能</h2>
      <div className="relative w-full max-w-md mx-auto h-[320px] flex items-center justify-center">
        <IconCloud iconSlugs={allSlugs} />
      </div>
    </section>
  );
};
