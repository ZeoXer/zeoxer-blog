import { Avatar } from "@heroui/avatar";
import Image from "next/image";

interface TimelineItemProps {
  title: string;
  subtitle?: string;
  startDate: string;
  endDate?: string;
  description?: string;
  logoUrl?: string;
}

export default function TimelineItem({
  title,
  subtitle,
  startDate,
  endDate,
  description,
  logoUrl,
}: TimelineItemProps) {
  return (
    <div className="flex items-start gap-4 rounded-lg">
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt={title}
          className="bg-default-100 rounded-full object-contain w-12 h-12 shrink-0"
          width={100}
          height={100}
        />
      ) : (
        <Avatar name={title} className="shrink-0 bg-default-200" size="lg" />
      )}
      <div className="w-full">
        <div className="flex justify-between items-center w-full">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">{title}</h3>
            {subtitle && (
              <h4 className=" text-gray-400 inline-block">{subtitle}</h4>
            )}
          </div>
          <p className="text-gray-500">
            {startDate} - {endDate || "Now"}
          </p>
        </div>
        {description && <p className="mt-4">{description}</p>}
      </div>
    </div>
  );
}
