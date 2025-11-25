import { siteConfig } from "@/config/site";
import { Card, CardBody } from "@heroui/card";

export const Description = () => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-foreground">關於我</h2>
      <Card className="bg-[#F5EFE6] dark:bg-default-100">
        <CardBody className="p-6">
          <p className="text-default-700 dark:text-default-600 leading-relaxed">
            {siteConfig.about}
          </p>
        </CardBody>
      </Card>
    </section>
  );
};
