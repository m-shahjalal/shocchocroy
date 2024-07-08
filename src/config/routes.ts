export const ROUTES = {
  CATEGORY: '/api/category',
  PRODUCT: '/api/products',
  SINGLE_PRODUCT: (slug: string) => `/api/products/${slug}`,
  RECOMMENDED_PRODUCT: `/api/products/recommended`,
  DISCOUNT: '/api/discount',
};
