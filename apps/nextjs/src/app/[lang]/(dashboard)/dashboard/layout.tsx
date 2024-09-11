import { notFound } from "next/navigation";

import { getCurrentUser } from "@saasfly/auth";

import { LocaleChange } from "~/components/locale-change";
import { MainNav } from "~/components/main-nav";
import { DashboardNav } from "~/components/nav";
import { SiteFooter } from "~/components/site-footer";
import { UserAccountNav } from "~/components/user-account-nav";
import { i18n, type Locale } from "~/config/i18n-config";
import { getDashboardConfig } from "~/config/ui/dashboard";
import { getDictionary } from "~/lib/get-dictionary";

import { type ReactNode } from 'react';
import * as React from 'react'
import Link from 'next/link'

import { cn } from '~/lib/utils'
import { clearChats } from '~/app/actions'
import { buttonVariants } from '~/components/chat/ui/button'
import { Sidebar } from '~/components/chat/sidebar'
import { SidebarList } from '~/components/chat/sidebar-list'
import {
  IconGitHub,
  IconNextChat,
  IconSeparator,
  IconVercel
} from '~/components/chat/ui/icons'
import { SidebarFooter } from '~/components/chat/sidebar-footer'
import { ThemeToggle } from '~/components/chat/theme-toggle'
import { ClearHistory } from '~/components/chat/clear-history'
import { UserMenu } from '~/components/chat/user-menu'
import { LoginButton } from '~/components/chat/login-button'
import { getServerSession } from "next-auth"
import { nanoid } from '~/lib/utils'
import { authOptions } from "@saasfly/auth"
import { Providers } from "~/components/chat/providers";

import { TooltipProvider } from '~/components/chat/ui/tooltip'
interface DashboardLayoutProps {
  children?: React.ReactNode;
  params: {
    lang: Locale;
  };
}

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function DashboardLayout({
  children,
  params: { lang },
}: DashboardLayoutProps) {
  const session = await getServerSession(authOptions)

  const user = await getCurrentUser();
  const dict = await getDictionary(lang);
  if (!user) {
    return notFound();
  }
  const dashboardConfig = await getDashboardConfig({ params: { lang } });
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav
            items={dashboardConfig.mainNav}
            params={{ lang: `${lang}` }}
          />
          <div className="flex items-center space-x-3">
            <LocaleChange url={"/dashboard"} />
            <UserAccountNav
              user={{
                name: user.name,
                image: user.image,
                email: user.email,
              }}
              params={{ lang: `${lang}` }}
              dict={dict.dropdown}
            />
          </div>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          {/*
          <DashboardNav
            items={dashboardConfig.sidebarNav}
            params={{ lang: `${lang}` }}
          />
           */}
        {session?.user ? (
          <Sidebar>
            <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
              {/* @ts-ignore */}
              <SidebarList userId={session?.user?.id} />
            </React.Suspense>
            <SidebarFooter>
              <ThemeToggle />
              <ClearHistory clearChats={clearChats} />
            </SidebarFooter>
          </Sidebar>
        ) : (
          <Link href="/" target="_blank" rel="nofollow">
            <IconNextChat className="mr-2 h-6 w-6 dark:hidden" inverted />
            <IconNextChat className="mr-2 hidden h-6 w-6 dark:block" />
          </Link>
        )}
        {/*
        <div className="flex items-center">
          <IconSeparator className="h-6 w-6 text-muted-foreground/50" />
          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <LoginButton
              variant="link"
              showGithubIcon={false}
              text="Login"
              className="-ml-2"
            />
          )}
          </div>*/}
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter
        className="border-t border-border"
        params={{ lang: `${lang}` }}
        dict={dict.common}
      />
    </div>
  );
}
