export const BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL
  : "http://localhost:5000/api/v1";

export const PRODUCTS_URL = "/products";
export const USERS_URL = "/users";
export const ORDERS_URL = "/orders";
export const PAYPAL_URL = "/config/paypal";
export const UPLOADS_URL = "/upload";
