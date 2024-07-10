export type ProductParams = {
  page?: number;
  size?: number;
  sort?: string;
  search?: string;
  category?: string;
  subcategory?: string;
  maxPrice?: number;
  minPrice?: number;
  minRating?: number;
};

export type DiscountParams = {
  page?: number
  size?: number;
  sort?: string;
  search?: string;
  maxDiscount?: number;
  minDiscount?: number;
}

export type CategoryParams = {
  page?: number;
  size?: number;
  sort?: string;
  search?: string;
  name?: string;
}