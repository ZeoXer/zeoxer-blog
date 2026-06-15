import { siteConfig } from "@/config/site";
import { Card, CardBody } from "@heroui/card";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export const Description = () => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-foreground">關於我</h2>
      <Card className="bg-[#F5EFE6] dark:bg-default-100">
        <CardBody className="p-6">
          <TextGenerateEffect
            words={siteConfig.about.trim()}
            className="text-default-700 dark:text-default-600"
          />
        </CardBody>
      </Card>
    </section>
  );
};
