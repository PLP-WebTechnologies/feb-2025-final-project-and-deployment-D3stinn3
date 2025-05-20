import { getNewArrivalsData, getTopSellingData, getAllOtherProducts } from "./product-details";
import { Product } from "@/types/product.types";

export const relatedProductData = async (): Promise<Product[]> => {
  const [newArrivalsData, topSellingData, allOtherProducts] = await Promise.all([
    getNewArrivalsData(),
    getTopSellingData(),
    getAllOtherProducts(),
  ]);

  return [...newArrivalsData, ...topSellingData, ...allOtherProducts];
};
