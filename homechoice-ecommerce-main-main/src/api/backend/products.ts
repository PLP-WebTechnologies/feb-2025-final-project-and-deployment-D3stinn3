  // api/backend/products.ts
  import axiosInstance from './axiosInstance';

  // Payload interfaces
  export interface AddProductPayload {
    id: number;
    product_category_id: number;
    product_name: string;
    product_image: string; // base64 or URL
    product_description: string;
    product_price: number;
    product_upcoming: boolean;
    [key: string]: string | number | boolean | undefined; 
  }

  export interface AddProductDetailsPayload {
    product_meatcut: string;
    product_weight: number;
    product_packaging: string;
    product_origin: string;
    product_processing: string;
    [key: string]: string | number;
  }

  export interface ProductPayload {
    product_name?: string;
    product_category?: string;
    product_description?: string;
    product_price?: number;
    product_upcoming?: boolean;
    product_image?: string;
  }

  export interface Product {
    id: number;
    product_name: string;
    product_category: string;
    product_image: string | null;
    product_description: string;
    product_price: string;
    product_upcoming: boolean;
    created_at: string;
  }

  export interface Category {
    id: number;
    category_name: string;
    category_image?: string;
    created_at: string;
  }

  export interface CreateCategoryPayload {
    name: string;
  }

  export interface UpdateCategoryPayload {
    name: string;
  }

  export type Discount = {
    discount_percentage: number;
    discount_start_date: string;
    discount_end_date: string;
    discount_code: string;
    discount_type: string;
  };
  

  // API functions

  /**
   * Create a new product.
   */
  export const addProduct = async (data: AddProductPayload) => {
    try {
      const response = await axiosInstance.post('productapi/api/products', data);
      console.log('✅ Product created:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ ERROR creating product:', error.response?.data || error.message);
      throw error;
    }
  };

  /**
   * Add details to an existing product.
   */
  export const addProductDetails = async (productId: number, data: AddProductDetailsPayload) => {
    try {
      const response = await axiosInstance.post(`productapi/api/products/${productId}/details`, data);
      console.log('✅ Product details added:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ ERROR adding product details:', error.response?.data || error.message);
      throw error;
    }
  };

  /**
   * Get all products with pagination.
   */
  export const getAllProducts = async (offset: number, productsPerPage: number): Promise<Product[]> => {
    try {
      const response = await axiosInstance.get('productapi/api/products', {
        params: { offset, limit: productsPerPage },
      });
      return response.data.data;
    } catch (error: any) {
      console.error('❌ ERROR fetching products:', error.response?.data || error.message);
      throw error;
    }
  };

  /**
   * Update a product by ID, optionally with an image file.
   */
  export const updateProduct = async (
    productId: number,
    payload: ProductPayload,
    file: File | null
  ) => {
    try {
      const formData = new FormData();
      formData.append('payload', JSON.stringify(payload));
      if (file) {
        formData.append('file', file);
      }

      const response = await axiosInstance.put(`productapi/api/products/${productId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('✅ Product updated:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ ERROR updating product:', error.response?.data || error.message);
      throw error;
    }
  };

  export const getProduct = async (productId: number) => {
    try {
      const response = await axiosInstance.get(`productapi/api/products/${productId}`);
      return response.data;
    } catch (error: any) {
      console.error('❌ ERROR fetching product:', error.response?.data || error.message);
      throw error;
    }
  };

  export const getProductDetails = async (productId: number) => {
    try {
      const response = await axiosInstance.get(`productapi/api/products/${productId}/details`);
      return response.data;
    } catch (error: any) {
      console.error('❌ ERROR fetching product details:', error.response?.data || error.message);
      throw error;
    }
  };

  export const updateProductDetails = async (
    productId: number,
    payload: AddProductDetailsPayload
  ) => {
    try {
      const response = await axiosInstance.put(`productapi/api/products/${productId}/details`, payload);
      return response.data;
    } catch (error: any) {
      console.error('❌ ERROR updating product details:', error.response?.data || error.message);
      throw error;
    }
  };

  /**
   * Create a new product category.
   */
  export const createCategory = async (data: CreateCategoryPayload) => {
    try {
      const response = await axiosInstance.post('productapi/api/categories', data);
      console.log('✅ Category created:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ ERROR creating category:', error.response?.data || error.message);
      throw error;
    }
  };

  /**
   * Get all product categories.
   */
  export const getAllCategories = async (): Promise<Category[]> => {
    try {
      const response = await axiosInstance.get('productapi/api/categories');
      return response.data.data || response.data; // adjust if your API response structure is different
    } catch (error: any) {
      console.error('❌ ERROR fetching categories:', error.response?.data || error.message);
      throw error;
    }
  };

  /**
   * Update a product category by ID.
   */
  export const updateCategory = async (categoryId: number, data: UpdateCategoryPayload) => {
    try {
      const response = await axiosInstance.put(`productapi/api/categories/${categoryId}`, data);
      console.log('✅ Category updated:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ ERROR updating category:', error.response?.data || error.message);
      throw error;
    }
  };

  /**
   * Delete a product category by ID.
   */
  export const deleteCategory = async (categoryId: number) => {
    try {
      const response = await axiosInstance.delete(`productapi/api/categories/${categoryId}`);
      console.log('✅ Category deleted:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ ERROR deleting category:', error.response?.data || error.message);
      throw error;
    }
  };

  /**
   * get discount by id
   */
  export const getDiscountById = async (discountId: number): Promise<Discount> => {
    try {
      const response = await axiosInstance.get(`productapi/api/product/discounts/${discountId}`);
      return response.data;
    } catch (error: any) {
      console.error("❌ ERROR fetching discount:", error.response?.data || error.message);
      throw error;
    }
  };