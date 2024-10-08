import Link from "next/link";
import { getCurrentUser } from "@saasfly/auth";

import * as Icons from "@saasfly/ui/icons";

import { XBlogArticle } from "~/components/blog-card";
import { Comments } from "~/components/comments";
import { DocumentGuide } from "~/components/document-guide";
import { FeaturesCard } from "~/components/features-card";
import { Meteorss } from "~/components/meteors-card";
import { Questions } from "~/components/questions";
import ShimmerButton from "~/components/shimmer-button";
import { TypewriterEffectSmooths } from "~/components/typewriterEffectSmooth";
import { WobbleCardShow } from "~/components/wobble";
import { WordReveal } from "~/components/word-reveal";
import type { Locale } from "~/config/i18n-config";
import { getDictionary } from "~/lib/get-dictionary";
import type { Meteor } from "~/types/meteors";
import { siteConfig } from "~/config/site";

import { Astrologyx } from "../../../components/astrology/astrology"
import { AstrologyForm } from "../../../components/astrology/astroform"

const meteors_data: Meteor = {
  name: "Join our Discord",
  description:
    "Join our Discord server to chat with other developers and get help.",
  button_content: "Chat with us",
  url: "https://discord.gg/8SwSX43wnD",
};



export default async function IndexPage({
  params: { lang },
}: {
  params: {
    lang: Locale;
  };
}) {

  const user = await getCurrentUser();
  const dict = await getDictionary(lang);
/*
  if (!dict.slogan) {
    return <div>Loading...</div>;
  }
*/
  return (
    <>
      <section className="w-full px-8 sm:px-48 md:px-48 xl:h-[100vh] xl:px-48">
        <div className="grid grid-cols-1 gap-10 pb-10 md:pb-40 xl:grid-cols-2">
          <div className="flex flex-col items-start">
            <div className="flex flex-col pt-4 md:pt-28 lg:pt-28 xl:pt-28">
              <Link href={siteConfig.url} target="_blank">
                <DocumentGuide>
                  {dict.marketing.introducing || "Introducing Saasfly"}
                </DocumentGuide>
              </Link>

              <div className="mt-6">
                <h1 className="relative mb-6 max-w-4xl text-left text-4xl font-bold dark:text-zinc-100 sm:text-7xl md:text-7xl xl:text-7xl">
                  {dict.marketing.title ||
                    "Saasfly: A new SaaS player? Make things easier."}
                </h1>
              </div>

              <div>
                <span className="text-zinc-500 sm:text-xl">
                  {dict.marketing.sub_title ||
                    "Your complete All-in-One solution for building SaaS services."}
                </span>
                <TypewriterEffectSmooths
                  prefix={dict.slogan.prefix || []}
                  customText={dict.slogan.customText || "" }
                  suffix={dict.slogan.suffix || []}
                  highlightClassName="text-green-500"
                />
              </div>

              <div className="mb-4 mt-6 flex w-full flex-col justify-center space-y-4 sm:flex-row sm:justify-start sm:space-x-8 sm:space-y-0">
                <AstrologyForm
                dict= {dict.form}
                userId={user?.id}
                />
{/*
                <Link href="https://github.com/saasfly/saasfly" target="_blank">
                  <div className="flex h-full items-center justify-center">
                    <Icons.GitHub className="mr-2 h-6 w-6" />
                    <span className="text-base font-semibold">
                      {dict.marketing.view_on_github || "View on GitHub"}
                    </span>
                  </div>
                </Link>*/}
              </div>
            </div>
          </div>

          <div className="hidden h-full w-full xl:block">
            <div className="flex flex-col pt-28">
              <div className="mt-4 flex w-full justify-between">
              <ShimmerButton className="mx-auto flex justify-center">
                <Astrologyx />
                </ShimmerButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hidden h-[100vh] w-full xl:block">
        <div className="flex h-full w-full justify-between px-[220px]">
          <div className="flex w-[60%] flex-col pr-4 pt-40">
            <WobbleCardShow params={{lang}} />
          </div>
          <div className="h-full w-[40%]">
            <div className="flex flex-col pl-[120px]">
              <WordReveal 
              textReveal= {dict.common.reveal}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="hidden h-[100vh] w-full xl:block">
        <div className="flex h-full w-full justify-between px-[220px]">
          <div className="flex w-[60%] flex-col pr-4 pt-40">
            <div className="px-[120px]">
              <Questions params={{lang}} />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-8 xl:hidden">
        <Questions params={{lang}} />
      </section>

      <section className="w-full px-8 pt-10 sm:px-0 sm:pt-0 md:px-0 md:pt-0 xl:px-0 xl:pt-0">
        <div className="flex h-full w-full flex-col items-center pb-[100px] pt-10">
          <div>
            <h1 className="mb-6 text-center text-3xl font-bold dark:text-zinc-100 md:text-5xl">
              {dict.comments.header}
            </h1>
          </div>
          <div className="mb-6 text-xl dark:text-zinc-100 md:text-xl">
              {dict.comments.description}
          </div>

          <div className="w-full overflow-x-hidden">
            <Comments />
          </div>          
        </div>
      </section>
    </>
  );
}
