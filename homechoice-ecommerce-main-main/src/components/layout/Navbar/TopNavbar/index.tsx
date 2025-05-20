import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React from "react";
import { NavMenu } from "../navbar.types";
import { MenuList } from "./MenuList";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem";
import Image from "next/image";
import InputGroup from "@/components/ui/input-group";
import ResTopNavbar from "./ResTopNavbar";
import CartBtn from "./CartBtn";
import ProfileBtn from "./ProfileBtn";

const data: NavMenu = [
  {
    id: 1,
    label: "Shop",
    type: "MenuList",
    children: [
      { id: 11, label: "Beef", url: "/shop?category=beef", description: "Premium cuts of beef." },
      { id: 12, label: "Mutton", url: "/shop?category=mutton", description: "Tender and flavorful cuts." },
      { id: 13, label: "Chicken", url: "/shop?category=chicken", description: "Fresh chicken cuts." },
      { id: 14, label: "Fish", url: "/shop?category=fish", description: "Fresh fish fillets and whole fish." },
      { id: 15, label: "Sausages", url: "/shop?category=processed", description: "Delicious sausages." },
      { id: 16, label: "Bone", url: "/shop?category=bone", description: "Quality t-bone, femur, and more." },
    ],
  },
  { id: 2, type: "MenuItem", label: "On Sale", url: "/shop#on-sale", children: [] },
  { id: 3, type: "MenuItem", label: "New Arrivals", url: "/shop#new-arrivals", children: [] },
  { id: 4, type: "MenuItem", label: "Upcoming", url: "/shop#upcoming", children: [] },
];

const TopNavbar = () => {
  return (
    <nav className="sticky top-0 bg-white z-20 shadow-md">
      <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start py-4 px-4 xl:px-0">
        {/* Left Section: Menu Button & Logo */}
        <div className="flex items-center">
          <div className="block md:hidden mr-4">
            <ResTopNavbar data={data} />
          </div>
          <Link href="/" className="mr-3 lg:mr-10">
            <Image
              src="/logo/logo.png"
              alt="HomeChoice Logo"
              width={120}
              height={40}
            />
          </Link>
        </div>

        {/* Center Navigation */}
        <NavigationMenu className="hidden md:flex mr-2 lg:mr-7">
          <NavigationMenuList>
            {data.map((item) => (
              <React.Fragment key={item.id}>
                {item.type === "MenuItem" && (
                  <MenuItem label={item.label} url={item.url} />
                )}
                {item.type === "MenuList" && (
                  <MenuList data={item.children} label={item.label} />
                )}
              </React.Fragment>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search Bar */}
        <InputGroup className="hidden md:flex bg-[#F0F0F0] mr-3 lg:mr-10">
          <InputGroup.Text>
            <Image
              priority
              src="/icons/search.svg"
              height={20}
              width={20}
              alt="search"
              className="min-w-5 min-h-5"
            />
          </InputGroup.Text>
          <InputGroup.Input
            type="search"
            name="search"
            placeholder="Search for products..."
            className="bg-transparent placeholder:text-black/40"
          />
        </InputGroup>

        {/* Right Section: Cart & Profile */}
        <div className="flex items-center">
          <Link href="/search" className="block md:hidden mr-[14px] p-1">
            <Image
              priority
              src="/icons/search-black.svg"
              height={100}
              width={100}
              alt="search"
              className="max-w-[22px] max-h-[22px]"
            />
          </Link>
          <CartBtn />
          <ProfileBtn />
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
