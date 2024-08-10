import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@saasfly/ui/accordion";
import type { Locale } from "~/config/i18n-config";
import { getDictionary } from "~/lib/get-dictionary";

export async function Questions({
  params: { lang },
}: {
  params: {
    lang: Locale;
  };
}) {
  const dict = await getDictionary(lang);

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>{dict.questions.about.trigger}</AccordionTrigger>
        <AccordionContent>
          {dict.questions.about.content}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>{dict.questions.why_ai.trigger}</AccordionTrigger>
        <AccordionContent>
          {dict.questions.why_ai.content}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>{dict.questions.is_it_for_you.trigger}</AccordionTrigger>
        <AccordionContent>
          {dict.questions.is_it_for_you.content}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}