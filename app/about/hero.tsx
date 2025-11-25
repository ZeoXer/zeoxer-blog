import { Avatar } from "@heroui/avatar";
import { Card, CardBody } from "@heroui/card";
import {
  FolderIcon,
  DocumentIcon,
  EmailIcon,
  GithubIcon,
  LinkedInIcon,
} from "@/components/icons";
import NumberCounter from "@/components/number-counter";
import { Link } from "@heroui/link";

interface HeroProps {
  articleCount: number;
  categoryCount: number;
}

export const Hero = ({ articleCount, categoryCount }: HeroProps) => {
  return (
    <header className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex items-center gap-4">
        <Avatar
          src="https://pub-730d41d50aa14413843d2f22e88310a6.r2.dev/uploads/2025/10/03/%E6%97%A5%E5%B8%B8%E5%80%8B%E4%BA%BA.jpg"
          className="w-24 h-24 lg:w-50 lg:h-50"
          isBordered
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground">楊佳勳</h1>

          <Link
            href="mailto:andrew17413@gmail.com"
            className="flex gap-2 text-default-800 items-center hover:text-warning transition-colors"
          >
            <EmailIcon className="w-7 h-7" />
            <span>andrew17413@gmail.com</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="https://github.com/ZeoXer" isExternal>
              <GithubIcon className="w-7 h-7 text-default-800 hover:text-warning transition-colors" />
            </Link>
            <Link href="https://www.linkedin.com/in/chia-hsun-yang" isExternal>
              <LinkedInIcon className="w-7 h-7 text-default-800 hover:text-warning transition-colors" />
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-[#FFD166] to-[#FFB457]">
          <CardBody className="flex flex-col items-center justify-center p-4 gap-3">
            <DocumentIcon className="w-10 h-10 text-black" />
            <p className="text-black">文章總數</p>
            <p className="text-4xl font-bold text-black">
              <NumberCounter endNumber={articleCount} />
            </p>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-[#FFD166] to-[#FFB457]">
          <CardBody className="flex flex-col items-center justify-center p-4 gap-3">
            <FolderIcon className="w-10 h-10 text-black stroke-2" />
            <p className="text-black">主題總數</p>
            <p className="text-4xl font-bold text-black">
              <NumberCounter endNumber={categoryCount} />
            </p>
          </CardBody>
        </Card>
      </div>
    </header>
  );
};
