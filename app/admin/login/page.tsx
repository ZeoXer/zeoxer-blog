"use client";

import { Card, CardHeader, CardBody } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useIsSSR } from "@react-aria/ssr";
import { useTheme } from "next-themes";
import Image from "next/image";
import ZeoXerLogo from "@/public/zeoxers-blog-logo-transparent.svg";
import ZeoXerWhiteLogo from "@/public/zeoxers-blog-logo-white-transparent.svg";
import { Button } from "@heroui/button";
import { login } from "@/data/auth";
import { setAuthToken } from "@/data/client/token";

export default function AdminLoginPage() {
  const { theme } = useTheme();
  const isSSR = useIsSSR();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const { data, status } = await login(email, password);
      if (status === 1) {
        setAuthToken(data.token);
        window.location.assign("article");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="relative max-h-screen">
      <Card className="absolute p-6 left-1/2 -translate-x-1/2 mt-32 w-full max-w-md">
        <CardHeader className="grid grid-cols-1 gap-4">
          <Image
            src={theme === "dark" && !isSSR ? ZeoXerWhiteLogo : ZeoXerLogo}
            alt="ZeoXer's Blog Logo"
            className="w-20 h-20 mx-auto"
            width={44}
            height={44}
          />
          <h2 className="text-2xl font-semibold text-center">後台登入</h2>
        </CardHeader>
        <CardBody>
          <Form onSubmit={onSubmit} className="gap-4">
            <Input
              isRequired
              errorMessage="請輸入有效信箱"
              label="信箱"
              labelPlacement="inside"
              size="lg"
              variant="faded"
              name="email"
              type="email"
            />
            <Input
              isRequired
              errorMessage="請輸入有效密碼"
              label="密碼"
              labelPlacement="inside"
              size="lg"
              variant="faded"
              name="password"
              type="password"
            />
            <div className="grid grid-cols-2 w-full gap-4">
              <Button type="submit" size="lg" color="warning">
                登入
              </Button>
              <Button type="reset" size="lg" variant="flat">
                重置
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
