export const PAGES = {
  ROOT: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  ERROR: '/error',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (slug: string) => `/products/${slug}`,

  DASHBOARD: {
    PRODUCTS: '/dashboard/product',
  },
};
