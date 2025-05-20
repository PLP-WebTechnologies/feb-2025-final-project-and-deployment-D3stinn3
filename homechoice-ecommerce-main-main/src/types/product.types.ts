export type Discount = {
  amount: number;
  percentage: number;
};

export type Product = {
  id: number;
  title: string;
  srcUrl: string;
  gallery?: string[];
  price: number;
  discount: Discount;
  rating: number;
  category: string;
  meatCut: string;
  productDetails: {
    meatCut: string,
    Weight: string,
    Packaging: string,
    Origin: string,
    Processing: string,
  },
};
