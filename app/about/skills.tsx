import { SkillCircle } from "@/components/skill-circle";
import { siteConfig } from "@/config/site";
import { Card } from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";

enum SkillCategories {
  backend = "後端開發",
  frontend = "前端開發",
  tool = "其它工具",
  service = "雲端服務",
}

export const Skills = () => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-foreground">相關技能</h2>
      <Tabs size="lg" variant="underlined">
        {Object.keys(SkillCategories).map((key) => {
          const skillKey = key as keyof typeof SkillCategories;
          return (
            <Tab key={key} title={SkillCategories[skillKey]}>
              <div className="p-6 grid grid-cols-5 gap-4">
                {siteConfig.skills[skillKey].map((skill) => (
                  <SkillCircle
                    key={skill.name}
                    value={skill.level}
                    label={skill.name}
                  />
                ))}
              </div>
            </Tab>
          );
        })}
      </Tabs>
    </section>
  );
};
