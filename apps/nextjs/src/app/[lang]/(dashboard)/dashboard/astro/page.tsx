// src/app/astro/page.tsx

import { redirect } from "next/navigation";
import { authOptions, getCurrentUser } from "@saasfly/auth";
import type { Locale } from "~/config/i18n-config";
import { getDictionary } from "~/lib/get-dictionary";
import { AstroPageClient } from "~/components/astrology/astroclient";

export default async function AstroPage({
    params: { lang },
  }: {
    params: {
      lang: Locale;
    };
  }) {
  
    const user = await getCurrentUser();
    const dict = await getDictionary(lang);
  if (!user) {
    redirect(authOptions?.pages?.signIn ?? "/login");
  }

  return (
    <AstroPageClient userId={user.id} dict={dict} />
  );
}