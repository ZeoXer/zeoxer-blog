import { SmileIcon } from "@/components/icons";
import { Button } from "@heroui/button";
import Image from "next/image";
import Link from "next/link";
import Otter from "@/public/otter.gif";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center gap-6 mt-20">
      <h2 className="text-2xl font-bold flex items-center gap-1">
        這裡沒有東西了 <SmileIcon className="w-8 h-8" />
      </h2>
      <Image src={Otter} alt="Otter" width={100} height={100} />
      <Button as={Link} href="/" size="lg" color="warning">
        游回首頁~
      </Button>
    </section>
  );
}
