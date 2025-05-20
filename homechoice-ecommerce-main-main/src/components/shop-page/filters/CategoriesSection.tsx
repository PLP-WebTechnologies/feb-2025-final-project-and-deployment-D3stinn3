import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

type Category = {
  title: string;
  slug: string;
};

const categoriesData: Category[] = [
  {
    title: "Beef",
    slug: "/shop?category=beef",
  },
  {
    title: "Mutton",
    slug: "/shop?category=mutton",
  },
  {
    title: "Chicken",
    slug: "/shop?category=chicken",
  },
  {
    title: "Fish",
    slug: "/shop?category=fish",
  },
  {
    title: "Processed",
    slug: "/shop?category=processed",
  },
  {
    title: "Bone",
    slug: "/shop?category=bone",
  },
  {
    title: "Ofals",
    slug: "/shop?category=ofals",
  }
];

const CategoriesSection = () => {
  return (
    <div className="flex flex-col space-y-0.5 text-black/60">
      {categoriesData.map((category, idx) => (
        <Link
          key={idx}
          href={category.slug}
          className="flex items-center justify-between py-2"
        >
          {category.title} <MdKeyboardArrowRight />
        </Link>
      ))}
    </div>
  );
};

export default CategoriesSection;
