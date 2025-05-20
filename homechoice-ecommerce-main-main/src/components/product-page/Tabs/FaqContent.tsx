import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = {
  question: string;
  answer: string;
};

const faqsData: FaqItem[] = [
  {
    question: "What is the cut of this meat?",
    answer:
      "We offer various cuts, including boneless cubes, fillets, steaks, and ribs. Each cut is carefully selected for quality.",
  },
  {
    question: "How is the meat packaged?",
    answer:
      "All our meats are vacuum-sealed to preserve freshness. We offer both individual and bulk packaging options.",
  },
  {
    question: "Is the meat frozen or fresh?",
    answer:
      "We offer both fresh and frozen options, depending on availability. Fresh meats are butchered and packaged the same day.",
  },
  {
    question: "Where is the meat sourced from?",
    answer:
      "Our meats are sourced from trusted local suppliers and farms, ensuring high-quality and sustainable practices.",
  },
  {
    question: "How should I store the meat?",
    answer:
      "Store fresh meat in the refrigerator and use it within the recommended timeframe. For frozen meat, keep it in the freezer until ready to use.",
  },
  {
    question: "What cooking methods are recommended for this cut?",
    answer:
      "Depending on the cut, we recommend grilling, roasting, or pan-searing for optimal flavor and tenderness. Refer to our cooking guide for detailed instructions.",
  },
];

const FaqContent = () => {
  return (
    <section>
      <h3 className="text-xl sm:text-2xl font-bold text-primary2 mb-5 sm:mb-6">
        Frequently Asked Questions
      </h3>
      <Accordion type="single" collapsible>
        {faqsData.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx + 1}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FaqContent;
