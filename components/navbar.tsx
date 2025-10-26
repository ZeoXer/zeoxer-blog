"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { UserIcon } from "@/components/icons";
import ZeoXerLogo from "@/public/zeoxers-blog-logo-transparent.svg";
import ZeoXerWhiteLogo from "@/public/zeoxers-blog-logo-white-transparent.svg";
import Image from "next/image";
import { useTheme } from "next-themes";

export const Navbar = () => {
  const { theme } = useTheme();

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <Image
              src={theme === "dark" ? ZeoXerWhiteLogo : ZeoXerLogo}
              alt="ZeoXer's Blog Logo"
              width={44}
              height={44}
            />
            <p className="font-bold text-inherit">ZeoXer's Blog</p>
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
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={"/"}
            startContent={<UserIcon className="w-5" />}
            variant="flat"
          >
            關於作者
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2"></div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
