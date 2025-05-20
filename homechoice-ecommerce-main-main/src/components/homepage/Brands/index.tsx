import Image from "next/image";
import React from "react";

const brandsData: { id: string; srcUrl: string }[] = [
  {
    id: "",
    srcUrl: "",
  },
];

const Brands = () => {
  return (
    <div className="bg-primary2">
      <div className="max-w-frame mx-auto flex flex-wrap items-center justify-center py-5 md:py-0 sm:px-4 xl:px-0 gap-x-7">
        {brandsData.map((brand) => (
          <Image
            key={brand.id}
            priority
            src={brand.srcUrl}
            height={0}
            width={0}
            alt={brand.id}
            className="h-auto w-auto max-w-[200px] lg:max-w-72 max-h-[100px] lg:max-h-28 my-5 md:my-11"
          />
        ))}
      </div>
    </div>
  );
};

export default Brands;
