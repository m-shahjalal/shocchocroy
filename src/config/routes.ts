export const ROUTES = {
  CATEGORY: '/api/category',
  CATEGORY_PRODUCTS: (sub: string) => `/api/category/${sub}`,
  PRODUCT: '/api/products',
  SINGLE_PRODUCT: (slug: string) => `/api/products/${slug}`,
  RECOMMENDED_PRODUCT: `/api/products/recommended`,
  DISCOUNT: '/api/discount',
};
