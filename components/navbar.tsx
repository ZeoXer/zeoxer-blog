"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Tabs, Tab } from "@heroui/tabs";
import NextLink from "next/link";

import { ThemeSwitch } from "@/components/theme-switch";
import ZeoXerLogo from "@/public/ZeoXer-blog.png";
import ZeoXerWhiteLogo from "@/public/ZeoXer-blog-white.png";
import Image from "next/image";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useIsSSR } from "@react-aria/ssr";
import { clearAuthToken, isAuthenticated } from "@/data/client/token";
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { Link } from "@heroui/link";

export const Navbar = () => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const isSSR = useIsSSR();

  const tabs = [
    {
      key: "/",
      match: (path: string | null) =>
        path === "/" || (path?.startsWith("/article/") ?? false),
    },
    { key: "/about", match: (path: string | null) => path === "/about" },
  ];

  const selectedKey =
    tabs.find((t) => t.match(pathname))?.key ?? pathname ?? "/";

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <Image
              src={theme === "dark" && !isSSR ? ZeoXerWhiteLogo : ZeoXerLogo}
              alt="ZeoXer's Blog Logo"
              className="w-20 h-20 shrink-0"
              width={50}
              height={50}
            />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Tabs selectedKey={selectedKey} variant="solid" radius="full">
            <Tab key="/" title="部落格" href="/" />
            <Tab key="/about" title="個人檔案" href="/about" />
          </Tabs>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Tabs selectedKey={selectedKey} variant="solid" radius="full">
          <Tab key="/" title="部落格" href="/" />
          <Tab key="/about" title="個人檔案" href="/about" />
        </Tabs>
        <ThemeSwitch />
        {/* <NavbarMenuToggle /> */}
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2"></div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};

export const AdminNavbar = () => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const isAuth = isAuthenticated();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const logout = () => {
    clearAuthToken();
    router.replace("/admin/login");
    addToast({
      title: "已登出",
      timeout: 2000,
      shouldShowTimeoutProgress: true,
      color: "primary",
    });
  };

  const tabs = [
    {
      key: "/admin/article",
      match: (path: string | null) =>
        path === "/admin/article" ||
        (path?.startsWith("/admin/article/") ?? false),
    },
    {
      key: "/admin/category",
      match: (path: string | null) => path === "/admin/category",
    },
    {
      key: "/admin/assets",
      match: (path: string | null) => path === "/admin/assets",
    },
  ];

  const selectedKey =
    tabs.find((t) => t.match(pathname))?.key ?? pathname ?? "/";

  const logoSrc = mounted && theme === "dark" ? ZeoXerWhiteLogo : ZeoXerLogo;

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      {mounted && isAuth && (
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="hidden lg:flex justify-start items-center gap-2"
              href="/admin/article"
            >
              <Image
                src={logoSrc}
                alt="ZeoXer's Blog Logo"
                className="w-20 h-20"
                width={50}
                height={50}
              />
            </NextLink>
          </NavbarBrand>
        </NavbarContent>
      )}

      <NavbarContent className="hidden sm:flex" justify="center">
        <NavbarItem className="hidden sm:flex items-center gap-2">
          <ThemeSwitch />
          {mounted && isAuth && (
            <>
              <Tabs selectedKey={selectedKey} variant="solid" radius="full">
                <Tab
                  key="/admin/article"
                  title="管理文章"
                  href="/admin/article"
                />
                <Tab
                  key="/admin/category"
                  title="管理分類"
                  href="/admin/category"
                />
                <Tab
                  key="/admin/assets"
                  title="管理圖床"
                  href="/admin/assets"
                />
              </Tabs>
              <Button as={Link} color="warning" size="sm" href="/">
                去前台
              </Button>
              <Button variant="bordered" size="sm" onPress={logout}>
                登出
              </Button>
            </>
          )}
        </NavbarItem>
      </NavbarContent>

      {mounted && isAuth && (
        <NavbarContent className="sm:hidden basis-1" justify="end">
          <Tabs selectedKey={selectedKey} variant="solid" radius="full">
            <Tab key="/admin/article" title="管理文章" href="/admin/article" />
            <Tab
              key="/admin/category"
              title="管理分類"
              href="/admin/category"
            />
            <Tab key="/admin/assets" title="管理圖床" href="/admin/assets" />
          </Tabs>
          <ThemeSwitch />
          {/* <NavbarMenuToggle /> */}
          <Button variant="bordered" size="sm" onPress={logout}>
            登出
          </Button>
        </NavbarContent>
      )}

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2"></div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
