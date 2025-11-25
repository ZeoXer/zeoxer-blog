import TimelineItem from "@/components/timeline-item";
import { siteConfig } from "@/config/site";
import { Card, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";

export const Experience = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-foreground">工作經歷</h2>
        <Card className="bg-[#F5EFE6] dark:bg-default-100">
          <CardBody className="p-8">
            {siteConfig.workExperience.map((exp, i) => (
              <div key={exp.company}>
                <TimelineItem
                  title={exp.company}
                  subtitle={exp.role}
                  startDate={exp.startYear}
                  endDate={exp.endYear}
                  description={exp.description}
                  logoUrl={exp.logo}
                />
                {i < siteConfig.workExperience.length - 1 && (
                  <Divider className="my-6" />
                )}
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
      <div className="flex flex-col gap-4 animate-move-from-bottom">
        <h2 className="text-2xl font-bold text-foreground">學習經歷</h2>
        <Card className="bg-[#F5EFE6] dark:bg-default-100">
          <CardBody className="p-8">
            {siteConfig.education.map((exp, i) => (
              <div key={exp.degree}>
                <TimelineItem
                  title={exp.school}
                  subtitle={exp.degree}
                  startDate={exp.startYear}
                  endDate={exp.endYear}
                  logoUrl={exp.logo}
                />
                {i < siteConfig.education.length - 1 && (
                  <Divider className="my-6" />
                )}
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </section>
  );
};
