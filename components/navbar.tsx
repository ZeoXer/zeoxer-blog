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
import ZeoXerLogo from "@/public/zeoxers-blog-logo-transparent.svg";
import ZeoXerWhiteLogo from "@/public/zeoxers-blog-logo-white-transparent.svg";
import Image from "next/image";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useIsSSR } from "@react-aria/ssr";
import { isAuthenticated } from "@/data/client/token";
import { useEffect, useState } from "react";

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
              className="w-14 h-14"
              width={44}
              height={44}
            />
            <p className="hidden sm:block font-bold text-inherit">
              ZeoXer's Blog
            </p>
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

  useEffect(() => {
    setMounted(true);
  }, []);

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
              className="flex justify-start items-center gap-2"
              href="/admin/article"
            >
              <Image
                src={logoSrc}
                alt="ZeoXer's Blog Logo"
                className="w-14 h-14"
                width={44}
                height={44}
              />
            </NextLink>
          </NavbarBrand>
        </NavbarContent>
      )}

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        {mounted && isAuth && (
          <NavbarItem className="hidden md:flex">
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
            </Tabs>
          </NavbarItem>
        )}
      </NavbarContent>

      {mounted && isAuth && (
        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <Tabs selectedKey={selectedKey} variant="solid" radius="full">
            <Tab key="/admin/article" title="管理文章" href="/admin/article" />
            <Tab
              key="/admin/category"
              title="管理分類"
              href="/admin/category"
            />
          </Tabs>
          <ThemeSwitch />
          {/* <NavbarMenuToggle /> */}
        </NavbarContent>
      )}

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2"></div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
