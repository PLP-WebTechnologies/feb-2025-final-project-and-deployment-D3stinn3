// src/app/shop/product/[...slug]/page.tsx
import { getNewArrivalsData, getTopSellingData, getAllOtherProducts } from "@/lib/product-page/product-details";
import { relatedProductData } from "@/lib/product-page/relatedProductData";
import ProductListSec from "@/components/common/ProductListSec";
import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import Tabs from "@/components/product-page/Tabs";
import { Product } from "@/types/product.types";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: { slug: string[] } }) {
  const [newArrivals, topSelling, allOther, related] = await Promise.all([
    getNewArrivalsData(),
    getTopSellingData(),
    getAllOtherProducts(),
    relatedProductData(),
  ]);

  const allProducts: Product[] = [...newArrivals, ...topSelling, ...related, ...allOther];
  const product = allProducts.find((p) => p.id === Number(params.slug[0]));

  if (!product) notFound();

  return (
    <main>
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={product.title} />
        <section className="mb-11">
          <Header data={product} />
        </section>
        <Tabs />
      </div>
      <div className="mb-[50px] sm:mb-20">
        <ProductListSec title="You might also like" data={related} />
      </div>
    </main>
  );
}
