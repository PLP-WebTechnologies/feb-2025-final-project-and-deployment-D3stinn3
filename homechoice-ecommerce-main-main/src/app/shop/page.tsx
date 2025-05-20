// src/app/shop/page.tsx
import { redirect } from "next/navigation";
import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MobileFilters from "@/components/shop-page/filters/MobileFilters";
import Filters from "@/components/shop-page/filters";
import { FiSliders } from "react-icons/fi";
import {
  getNewArrivalsData,
  getTopSellingData,
  getAllOtherProducts,
} from "@/lib/product-page/product-details";
import { relatedProductData } from "@/lib/product-page/relatedProductData";
import ProductCard from "@/components/common/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string; meatCut?: string; page?: string };
}) {
  const itemsPerPage = 12;
  const currentPage = Number(searchParams.page ?? "1");
  if (isNaN(currentPage) || currentPage < 1) redirect("/shop?page=1");

  const [newArrivals, topSelling, allOther, related] = await Promise.all([
    getNewArrivalsData(),
    getTopSellingData(),
    getAllOtherProducts(),
    relatedProductData(),
  ]);

  const allProducts = [
    ...related.slice(1, 42),
    ...newArrivals.slice(1, 4),
    ...topSelling.slice(1, 4),
    ...allOther.slice(1, 42),
  ];

  const categoryFilter = searchParams.category?.toLowerCase();
  const meatCutFilter = searchParams.meatCut?.toLowerCase();

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = categoryFilter
      ? product.category.toLowerCase().includes(categoryFilter)
      : true;
    const matchesMeatCut = meatCutFilter
      ? product.meatCut.toLowerCase() === meatCutFilter
      : true;
    return matchesCategory && matchesMeatCut;
  });

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbShop />
        <div className="flex md:space-x-5 items-start">
          <aside className="hidden md:block min-w-[295px] max-w-[295px] border border-black/10 rounded-[20px] px-5 md:px-6 py-5 space-y-5 md:space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-bold text-primary2 text-xl">Filters</span>
              <FiSliders className="text-2xl text-primary2/40" />
            </div>
            <Filters />
          </aside>
          <section className="flex flex-col w-full space-y-5">
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div className="flex items-center justify-between">
                <h1 className="text-primary2 font-bold text-2xl md:text-[32px]">All You Can Meat</h1>
                <MobileFilters />
              </div>
              <div className="flex flex-col sm:items-center sm:flex-row">
                <span className="text-sm md:text-base text-black/60 mr-3">
                  Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, totalProducts)} of {totalProducts} Products
                </span>
                <div className="flex items-center">
                  Sort by:{" "}
                  <Select defaultValue="most-popular">
                    <SelectTrigger className="font-medium text-sm px-1.5 sm:text-base w-fit text-black bg-transparent shadow-none border-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="most-popular">Most Popular</SelectItem>
                      <SelectItem value="low-price">Low Price</SelectItem>
                      <SelectItem value="high-price">High Price</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
            <hr className="border-t-black/10" />
            <Pagination className="justify-between">
              <PaginationPrevious
                href={`?page=${currentPage - 1}`}
                className={`border border-black/10 ${currentPage === 1 ? "opacity-50 pointer-events-none" : ""}`}
              />
              <PaginationContent>
                {Array.from({ length: totalPages }).map((_, index) => {
                  const page = index + 1;
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href={`?page=${page}`}
                        className={`text-black/50 font-medium text-sm ${currentPage === page ? "font-bold" : ""}`}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
              </PaginationContent>
              <PaginationNext
                href={`?page=${currentPage + 1}`}
                className={`border border-black/10 ${currentPage === totalPages ? "opacity-50 pointer-events-none" : ""}`}
              />
            </Pagination>
          </section>
        </div>
      </div>
    </main>
  );
}
