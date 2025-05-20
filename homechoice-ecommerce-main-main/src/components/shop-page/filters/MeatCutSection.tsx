import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

type MeatCut = {
  title: string;
  slug: string;
};

const meatCutsData: MeatCut[] = [
  {
    title: "Sliced",
    slug: "/shop?meatCut=sliced",
  },
  {
    title: "Minced",
    slug: "/shop?meatCut=minced",
  },
  {
    title: "Whole",
    slug: "/shop?meatCut=whole",
  },
  {
    title: "Chopped",
    slug: "/shop?meatCut=chopped",
  },
];

const MeatCutSection = () => {
  return (
    <Accordion type="single" collapsible defaultValue="filter-cut">
      <AccordionItem value="filter-cut" className="border-none">
        <AccordionTrigger className="text-primary2 font-bold text-xl hover:no-underline p-0 py-0.5">
          Meat Cuts
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex flex-col text-black/60 space-y-0.5">
            {meatCutsData.map((meatCut, idx) => (
              <Link
                key={idx}
                href={meatCut.slug}
                className="flex items-center justify-between py-2"
              >
                {meatCut.title} <MdKeyboardArrowRight />
              </Link>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MeatCutSection;
