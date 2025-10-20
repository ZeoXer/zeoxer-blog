# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 blog application built with TypeScript, HeroUI v2 component library, and Tailwind CSS 4. The project uses the App Router architecture and includes dark mode support via next-themes.

## Development Commands

### Start Development Server
```bash
npm run dev
```
Uses Next.js 15 with Turbopack for fast HMR.

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Linting
```bash
npm run lint
```
Runs ESLint with auto-fix enabled. The project uses a comprehensive ESLint configuration with TypeScript, React, accessibility, and Prettier rules.

## Architecture & Structure

### App Router Structure
- `app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with HeroUIProvider, ThemeProvider, and global Navbar
  - `providers.tsx` - Client component wrapping HeroUIProvider and NextThemesProvider
  - `page.tsx` - Home page
  - Route folders: `blog/`, `docs/`, `pricing/`, `about/`

### Configuration Files
- `config/site.ts` - Site configuration including navigation items and external links
- `config/fonts.ts` - Google Fonts configuration (Inter for sans, Fira Code for mono)

### Components Directory
- `components/navbar.tsx` - Main navigation component
- `components/theme-switch.tsx` - Dark/light mode toggle
- `components/primitives.ts` - Shared style variants using tailwind-variants
- `components/icons.tsx` - SVG icon components

### Path Aliases
TypeScript is configured with `@/*` pointing to the project root, allowing imports like `@/components/navbar`.

## HeroUI Component Usage

HeroUI v2 is the primary UI library for this project. Components are imported from individual packages for better tree-shaking.

### Provider Setup
All HeroUI components require wrapping in `HeroUIProvider` (see `app/providers.tsx`). The provider is initialized with Next.js navigation:

```tsx
<HeroUIProvider navigate={router.push}>
  <NextThemesProvider {...themeProps}>
    {children}
  </NextThemesProvider>
</HeroUIProvider>
```

### Component Import Pattern
Import components from their scoped packages:
```tsx
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Navbar, NavbarContent, NavbarItem } from "@heroui/navbar";
```

### Available HeroUI Components
The project has these HeroUI packages installed:
- Layout: `navbar`, `card`, `divider`, `spacer`, `drawer`, `modal`
- Form: `button`, `input`, `select`, `switch`, `radio`, `autocomplete`, `form`
- Data Display: `table`, `avatar`, `badge`, `chip`, `code`, `image`, `kbd`, `snippet`, `tooltip`, `user`, `skeleton`, `progress`, `spinner`
- Navigation: `link`, `pagination`, `tabs`, `dropdown`, `listbox`, `popover`
- Feedback: `alert`, `toast`
- Utilities: `scroll-shadow`, `accordion`

### Styling HeroUI Components

#### Using Built-in Variants
HeroUI components support variants for common styling patterns:
```tsx
<Button color="primary" variant="shadow" radius="full">
  Click me
</Button>
```

#### Custom Classes with classNames Prop
Most HeroUI components accept a `classNames` prop for granular styling:
```tsx
<Input
  classNames={{
    inputWrapper: "bg-default-100",
    input: "text-sm",
  }}
/>
```

#### Using Theme Utilities
Import styling utilities from `@heroui/theme`:
```tsx
import { button as buttonStyles, link as linkStyles } from "@heroui/theme";

<Link className={buttonStyles({ color: "primary", variant: "shadow" })}>
  Styled Link
</Link>
```

### HeroUI with Next.js Integration
For Next.js Link integration, use the `as` prop:
```tsx
import NextLink from "next/link";
import { Link } from "@heroui/link";

<Link as={NextLink} href="/about">
  About
</Link>
```

For Button as Link:
```tsx
<Button as={Link} href="/docs">
  Documentation
</Button>
```

### Responsive Design with HeroUI
HeroUI components work with Tailwind's responsive utilities:
```tsx
<div className="hidden lg:flex gap-4">
  {/* Desktop only */}
</div>
<div className="flex lg:hidden">
  {/* Mobile only */}
</div>
```

## Styling System

### Tailwind CSS 4
The project uses Tailwind CSS 4 with the HeroUI plugin. Configuration in `tailwind.config.js` includes:
- Content paths for component scanning
- Custom font family variables
- Dark mode: `class` strategy
- HeroUI theme plugin

### Tailwind Variants
`components/primitives.ts` uses `tailwind-variants` for creating reusable style variants:
```tsx
import { tv } from "tailwind-variants";

export const title = tv({
  base: "tracking-tight inline font-semibold",
  variants: {
    color: { /* ... */ },
    size: { /* ... */ }
  }
});
```

Usage:
```tsx
<span className={title({ color: "violet", size: "lg" })}>
  Title Text
</span>
```

### Dark Mode
Dark mode is managed by `next-themes` with class-based strategy. The theme is set to "dark" by default (see `app/layout.tsx`). Use Tailwind's `dark:` prefix for dark mode styles:
```tsx
<div className="bg-white dark:bg-black text-black dark:text-white">
```

## ESLint Configuration

The project enforces strict linting rules:
- TypeScript strict mode enabled
- React hooks and JSX a11y rules
- Automatic import sorting by type/source
- JSX prop sorting (callbacks last, shorthand first)
- Padding between statements
- Unused imports auto-removal

## TypeScript Configuration

- Strict mode enabled
- Path alias: `@/*` maps to project root
- Target: ES5 with ESNext modules
- JSX: preserve (handled by Next.js)

## Client Components

Components using browser APIs, hooks, or interactivity must have `"use client"` directive:
- `app/providers.tsx` - Uses React context and hooks
- `components/theme-switch.tsx` - Uses useTheme hook
- Any component using useState, useEffect, event handlers, etc.

## Key Patterns

### Navigation Menu
See `components/navbar.tsx` for the pattern of building responsive navigation with HeroUI Navbar components, including:
- Desktop menu with NavbarItem
- Mobile menu with NavbarMenuToggle and NavbarMenu
- Integration with next-themes for ThemeSwitch
- Search input with Kbd component for keyboard shortcuts

### Layout Pattern
The root layout (`app/layout.tsx`) establishes the pattern:
1. Metadata and viewport configuration
2. HeroUIProvider + ThemeProvider wrapping
3. Consistent Navbar + main content + footer structure
4. Global styles via `@/styles/globals.css`

### Page Structure
Pages typically follow this pattern (see `app/page.tsx`):
1. Import HeroUI components individually
2. Import shared primitives for styling
3. Use HeroUI components with Tailwind utilities
4. Responsive layout with flexbox/grid

## Important Notes

- Always import HeroUI components from their scoped packages (`@heroui/[component]`)
- Use `@/` path alias for local imports
- Maintain ESLint compliance (import order, padding, unused imports)
- Add `"use client"` for any interactive components
- Use HeroUI's built-in variants before adding custom styles
- Leverage `classNames` prop for granular HeroUI component styling
