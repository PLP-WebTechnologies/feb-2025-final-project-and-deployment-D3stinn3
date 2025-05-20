import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands";
import DressStyle from "@/components/homepage/DressStyle";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";
import { getNewArrivalsData, getTopSellingData, getAllOtherProducts } from "@/lib/product-page/product-details";
import { reviewsData } from "@/lib/review/reviews";

export default async function Home() {
  const [newArrivalsData, topSellingData, allOtherProducts] = await Promise.all([
    getNewArrivalsData(),
    getTopSellingData(),
    getAllOtherProducts()
  ]);
  
  return (
    <>
      <Header />
      <Brands />
      <main className="my-[50px] sm:my-[72px]">
        <div className="mb-[50px] sm:mb-20">
          <ProductListSec
            title="TOP SELLING"
            data={topSellingData}
            viewAllLink="/shop#top-selling"
          />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <ProductListSec
            title="NEW ARRIVALS"
            data={newArrivalsData}
            viewAllLink="/shop#new-arrivals"
          />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <Reviews data={reviewsData} />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <DressStyle />
        </div>
      </main>
    </>
  );
}
