import { content as defaultContent } from "@/config/content";
import { theme } from "@/config/theme";
import { layout } from "@/config/layout";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  content?: typeof defaultContent;
}

export function FAQ({ content = defaultContent }: FAQProps) {
  return (
    <section
      id="faq"
      className={cn(
        theme.faq.layout.section,
        theme.faq.spacing.section,
        theme.layout.section.scrollMargin
      )}
    >
      <h2 className={cn(theme.faq.typography.title, theme.faq.spacing.title)}>
        {content.faq.title}
      </h2>
      <Accordion
        type={layout.faq.accordion.type}
        collapsible={layout.faq.accordion.collapsible}
        className={theme.faq.layout.accordion}
      >
        {content.faq.items.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}


