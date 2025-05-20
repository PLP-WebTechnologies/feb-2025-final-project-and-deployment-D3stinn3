import React from "react";

export type SpecItem = {
  label: string;
  value: string;
};

const specsData: SpecItem[] = [
  {
    label: "Meat Cut",
    value: "Boneless Beef",
  },
  {
    label: "Weight",
    value: "1kg",
  },
  {
    label: "Packaging",
    value: "Vacuum Sealed",
  },
  {
    label: "Origin",
    value: "Locally Sourced",
  },
  {
    label: "Processing",
    value: "Freshly Butchered",
  },
];

const ProductDetails = () => {
  return (
    <>
      {specsData.map((item, i) => (
        <div className="grid grid-cols-3" key={i}>
          <div>
            <p className="text-sm py-3 w-full leading-7 lg:py-4 pr-2 text-neutral-500">
              {item.label}
            </p>
          </div>
          <div className="col-span-2 py-3 lg:py-4 border-b">
            <p className="text-sm w-full leading-7 text-neutral-800 font-medium">
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductDetails;
