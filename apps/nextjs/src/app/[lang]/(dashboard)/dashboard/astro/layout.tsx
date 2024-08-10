import { notFound } from "next/navigation";

import { getCurrentUser } from "@saasfly/auth";

import { MainNav } from "~/components/main-nav";
import { DashboardNav } from "~/components/nav";
import { SiteFooter } from "~/components/site-footer";
import { UserAccountNav } from "~/components/user-account-nav";
import type { Locale } from "~/config/i18n-config";
import { getDashboardConfig } from "~/config/ui/dashboard";
import { getDictionary } from "~/lib/get-dictionary";

interface AstroLayoutProps {
  children?: React.ReactNode;
  params: {
    lang: Locale;
  };
}

export default async function AstroLayout({
  children,
  params: { lang },
}: AstroLayoutProps) {
  const user = await getCurrentUser();
  const dict = await getDictionary(lang);

  const dashboardConfig = await getDashboardConfig({ params: { lang } });
  if (!user) {
    return notFound();
  }

  return (
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
  );
}
