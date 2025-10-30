"use client";

import { Button } from "@heroui/button";
import axios from "axios";

export default function AdminAssetsPage() {
  const listBucketAssets = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET_URL}?list-type=2`,
      {
        auth: {
          username:
            process.env.NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET_ACCESS_KEY || "",
          password:
            process.env.NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET_SECRET_KEY || "",
        },
      }
    );

    console.log("Bucket Assets:", response.data);
  };

  return (
    <div>
      最難的圖床要來了<Button onPress={listBucketAssets}>測試</Button>
    </div>
  );
}
