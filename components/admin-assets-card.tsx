"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Drawer, DrawerContent } from "@heroui/drawer";
import { useDisclosure } from "@heroui/modal";
import Image from "next/image";
import { useState } from "react";
import { CheckIcon, CopyIcon, GoOutIcon } from "./icons";

export const AdminAssetsCard = ({ asset }: { asset: R2Object }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [copied, setCopied] = useState(false);

  const copyImgLink = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_R2_BUCKET_URL}/${asset.key}`
    );
    alertCopySuccess();
  };

  const alertCopySuccess = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <Card isPressable onPress={onOpen}>
        <CardBody>
          <div className="flex hover:underline justify-between items-center">
            <h3 className="line-clamp-1">{asset.key.split("/").pop()}</h3>
            <GoOutIcon className="w-5 shrink-0" />
          </div>
        </CardBody>
      </Card>
      <Drawer
        isDismissable={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="right"
        backdrop="blur"
      >
        <DrawerContent>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">
              {asset.key.split("/").pop()}
            </h3>
            <Divider />
            <div className="h-100 overflow-auto my-8 flex flex-col justify-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_R2_BUCKET_URL}/${asset.key}`}
                alt={asset.key.split("/").pop() || "asset image"}
                width={300}
                height={300}
                className="object-cover mx-auto"
              />
            </div>
            <Button
              className="w-full"
              variant="ghost"
              onPress={copyImgLink}
              startContent={
                copied ? (
                  <CheckIcon className="w-5" />
                ) : (
                  <CopyIcon className="w-5" />
                )
              }
            >
              {copied ? "已複製！" : "複製連結"}
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
