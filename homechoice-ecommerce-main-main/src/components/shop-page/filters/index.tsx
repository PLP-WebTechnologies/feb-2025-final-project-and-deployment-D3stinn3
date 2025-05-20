import React from "react";
import CategoriesSection from "@/components/shop-page/filters/CategoriesSection";
import MeatCutSection from "@/components/shop-page/filters/MeatCutSection";
import PriceSection from "@/components/shop-page/filters/PriceSection";
import { Button } from "@/components/ui/button";
import AllSection from "@/components/shop-page/filters/AllSection";

const Filters = () => {
  return (
    <>
      <hr className="border-t-black/10" />
      <AllSection />
      <hr className="border-t-black/10" />
      <CategoriesSection />
      <hr className="border-t-black/10" />
      <PriceSection />
      <hr className="border-t-black/10" />
      <MeatCutSection />
      <Button
        type="button"
        className="bg-primary2 w-full rounded-full text-sm font-medium py-4 h-12"
      >
        Apply Filter
      </Button>
    </>
  );
};

export default Filters;
