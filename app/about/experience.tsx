import { siteConfig } from "@/config/site";
import { Timeline, TimelineEntry } from "@/components/ui/timeline";
import TimelineItem from "@/components/timeline-item";

export const Experience = () => {
  const workEntries: TimelineEntry[] = siteConfig.workExperience.map((exp) => ({
    title: `${exp.startYear} - ${exp.endYear || "Now"}`,
    content: (
      <TimelineItem
        title={exp.company}
        subtitle={exp.role}
        descriptions={exp.descriptions}
        logoUrl={exp.logo}
      />
    ),
  }));

  const educationEntries: TimelineEntry[] = siteConfig.education.map((exp) => ({
    title: `${exp.startYear} - ${exp.endYear || "Now"}`,
    content: (
      <TimelineItem
        title={exp.school}
        subtitle={exp.degree}
        logoUrl={exp.logo}
      />
    ),
  }));

  return (
    <section className="flex flex-col gap-12">
      <Timeline
        data={workEntries}
        heading={
          <h2 className="text-2xl font-bold text-foreground">工作經歷</h2>
        }
      />
      <Timeline
        data={educationEntries}
        heading={
          <h2 className="text-2xl font-bold text-foreground">學習經歷</h2>
        }
      />
    </section>
  );
};
