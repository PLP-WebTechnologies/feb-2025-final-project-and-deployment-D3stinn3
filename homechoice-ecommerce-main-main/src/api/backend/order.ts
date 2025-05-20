import axiosInstance from "./axiosInstance";

export interface OrderRequest {
  product_id: number;
  order_price: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  order_date: string; // format: YYYY-MM-DD
  order_time: string; // ISO timestamp format
}

// 📦 Create a new order
export const createOrder = async (orderData: OrderRequest) => {
  try {
    const response = await axiosInstance.post("orderapi/api/orders", orderData);
    return response.data;
  } catch (error: any) {
    console.error("❌ ERROR creating order:", error.response?.data || error.message);
    throw error;
  }
};
