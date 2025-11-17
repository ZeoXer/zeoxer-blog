import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import RootLayoutWrapper from "./root-layout-wrapper";
import { LoadingProvider } from "./use-loading";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="zh-TW">
      <head>
        <script
          defer
          src="https://blog-statistic.zeoxer.com/script.js"
          data-website-id="55ecf8df-5056-4a3f-947c-e898f496e3e3"
        ></script>
      </head>
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <LoadingProvider>
            <RootLayoutWrapper>{children}</RootLayoutWrapper>
          </LoadingProvider>
        </Providers>
      </body>
    </html>
  );
}
