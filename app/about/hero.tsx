"use client";

import { Card, CardBody } from "@heroui/card";
import Image from "next/image";
import {
  FolderIcon,
  DocumentIcon,
  EmailIcon,
  GithubIcon,
  LinkedInIcon,
} from "@/components/icons";
import NumberCounter from "@/components/number-counter";
import { Link } from "@heroui/link";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Lens } from "@/components/ui/lens";
import {
  AnimatedTooltip,
  AnimatedTooltipItem,
} from "@/components/ui/animated-tooltip";

const AVATAR_SRC =
  "https://pub-730d41d50aa14413843d2f22e88310a6.r2.dev/uploads/2025/10/03/%E6%97%A5%E5%B8%B8%E5%80%8B%E4%BA%BA.jpg";

const SOCIAL_ITEMS: AnimatedTooltipItem[] = [
  {
    id: "github",
    name: "GitHub",
    designation: "@ZeoXer",
    href: "https://github.com/ZeoXer",
    external: true,
    icon: <GithubIcon className="w-7 h-7" />,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    designation: "楊佳勳",
    href: "https://www.linkedin.com/in/chia-hsun-yang",
    external: true,
    icon: <LinkedInIcon className="w-7 h-7" />,
  },
];

interface HeroProps {
  articleCount: number;
  categoryCount: number;
}

export const Hero = ({ articleCount, categoryCount }: HeroProps) => {
  return (
    <header className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex items-center gap-4">
        <Lens
          ariaLabel="楊佳勳"
          zoomFactor={1.6}
          lensSize={140}
          className="w-24 h-24 lg:w-50 lg:h-50 shrink-0 border-2 border-default-300"
        >
          <Image
            src={AVATAR_SRC}
            alt="楊佳勳"
            width={400}
            height={400}
            className="w-full h-full object-cover"
            unoptimized
          />
        </Lens>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground">楊佳勳</h1>

          <Link
            href="mailto:andrew17413@gmail.com"
            className="flex gap-2 text-default-800 items-center hover:text-warning transition-colors"
          >
            <EmailIcon className="w-7 h-7" />
            <span>andrew17413@gmail.com</span>
          </Link>
          <AnimatedTooltip items={SOCIAL_ITEMS} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <CardSpotlight color="#fb923c" radius={300}>
          <Card className="bg-gradient-to-br from-[#FFD166] to-[#FFB457] shadow-none">
            <CardBody className="flex flex-col items-center justify-center p-4 gap-3">
              <DocumentIcon className="w-10 h-10 text-black" />
              <p className="text-black">文章總數</p>
              <p className="text-4xl font-bold text-black">
                <NumberCounter endNumber={articleCount} />
              </p>
            </CardBody>
          </Card>
        </CardSpotlight>
        <CardSpotlight color="#fb923c" radius={300}>
          <Card className="bg-gradient-to-br from-[#FFD166] to-[#FFB457] shadow-none">
            <CardBody className="flex flex-col items-center justify-center p-4 gap-3">
              <FolderIcon className="w-10 h-10 text-black stroke-2" />
              <p className="text-black">主題總數</p>
              <p className="text-4xl font-bold text-black">
                <NumberCounter endNumber={categoryCount} />
              </p>
            </CardBody>
          </Card>
        </CardSpotlight>
      </div>
    </header>
  );
};
