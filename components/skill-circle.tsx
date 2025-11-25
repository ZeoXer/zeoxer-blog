import { CircularProgress } from "@heroui/progress";

interface SkillCircleProps {
  value: number;
  label?: string;
}

export const SkillCircle = ({ value, label }: SkillCircleProps) => {
  return (
    <CircularProgress
      color="warning"
      classNames={{
        svg: "w-24 h-24 drop-shadow-md",
        value: "text-xl",
        label: "text-lg",
      }}
      className="mx-auto"
      label={label}
      showValueLabel={true}
      size="lg"
      value={value}
    />
  );
};
