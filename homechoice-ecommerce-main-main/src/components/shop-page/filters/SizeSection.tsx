"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const SizeSection = () => {
  const [selected, setSelected] = useState<string>("1 kg");

  return (
    <Accordion type="single" collapsible defaultValue="filter-size">
      <AccordionItem value="filter-size" className="border-none">
        <AccordionTrigger className="text-primary2 font-bold text-xl hover:no-underline p-0 py-0.5">
          Size
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex items-center flex-wrap">
            {["1 kg", "3/4 kg", "1/2 kg", "1/4 kg"].map((size, index) => (
              <button
                key={index}
                type="button"
                className={cn([
                  "bg-[#F0F0F0] m-1 flex items-center justify-center px-5 py-2.5 text-sm rounded-full max-h-[39px]",
                  selected === size && "bg-primary2 font-medium text-white",
                ])}
                onClick={() => setSelected(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SizeSection;
