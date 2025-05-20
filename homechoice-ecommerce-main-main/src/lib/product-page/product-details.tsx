// src/lib/product-page/product-details.ts
import { Product } from "@/types/product.types";
import { getAllProducts } from "@/api/backend/products";

const transform = (apiProduct: any): Product => {
  const detail = apiProduct.details?.[0] ?? {};
  const discount = apiProduct.discounts?.[0] ?? { discount_percentage: "0.00" };

  return {
    id: apiProduct.id,
    title: apiProduct.product_name,
    srcUrl: apiProduct.product_image || "/images/default.png",
    gallery: [apiProduct.product_image || "/images/default.png"],
    price: parseFloat(apiProduct.product_price),
    discount: {
      amount: 0,
      percentage: parseFloat(discount.discount_percentage),
    },
    rating: 0,
    category: apiProduct.product_category.toLowerCase(),
    meatCut: detail.product_meatcut || "",
    productDetails: {
      meatCut: detail.product_meatcut || "",
      Weight: detail.product_weight || "",
      Packaging: detail.product_packaging || "",
      Origin: detail.product_origin || "",
      Processing: detail.product_processing || "",
    },
  };
};

// ✅ Shared single fetch promise (cached within the module)
const allProductsPromise: Promise<Product[]> = getAllProducts(0, 100).then(data =>
  data.map(transform)
);

// ✅ These now resolve from the same underlying promise
export const getNewArrivalsData = async (): Promise<Product[]> => {
  const products = await allProductsPromise;
  return products.filter(p => [1, 2, 3, 4].includes(p.id));
};

export const getTopSellingData = async (): Promise<Product[]> => {
  const products = await allProductsPromise;
  return products.filter(p => [5, 6, 7, 8].includes(p.id));
};

export const getAllOtherProducts = async (): Promise<Product[]> => {
  return allProductsPromise;
};