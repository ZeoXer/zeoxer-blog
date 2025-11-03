"use client";

import { AdminAssetsList } from "@/components/admin-assets-list";
import { GoOutIcon, UploadIcon } from "@/components/icons";
import { listImagesInBucket, uploadImageToR2 } from "@/data/image";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminAssetsPage() {
  const [objects, setObjects] = useState<R2Object[]>([]);

  useEffect(() => {
    listBucketAssets();
  }, []);

  const listBucketAssets = async () => {
    const { data } = await listImagesInBucket();
    setObjects(data);
  };

  const handleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    const file: File | null = files && files.length > 0 ? files[0] : null;

    if (!file) return;

    try {
      const { status } = await uploadImageToR2(file);
      if (status === 1) {
        listBucketAssets();
        addToast({
          title: "圖片上傳成功",
          description: `${file.name}`,
          timeout: 3000,
          shouldShowTimeoutProgress: true,
          color: "success",
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <section>
      <header className="flex justify-between mb-8">
        <h2 className="font-bold text-3xl">我的圖床</h2>
        <div className="flex gap-2">
          <Button variant="ghost" startContent={<UploadIcon className="w-5" />}>
            <label htmlFor="upload" className="cursor-pointer">
              上傳圖片
            </label>
          </Button>
          <Button
            as={Link}
            href="https://blog-assets.zeoxer.com/"
            target="_blank"
            variant="ghost"
            startContent={<GoOutIcon className="w-5" />}
          >
            Cloudreve
          </Button>
        </div>
        <input
          type="file"
          id="upload"
          className="hidden"
          onChange={handleUploadImage}
        />
      </header>
      <AdminAssetsList assets={objects} />
    </section>
  );
}
