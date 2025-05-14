import { Product, Category, Billboard } from '@/types/types';

const STORE_ID = process.env.STORE_ID || "9163e59b-5994-48da-801f-489b695929ad";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://pharma-admin-bflbbgkuh-kvothes-projects-c1e46e5f.vercel.app/api";

/**
 * Fetch all products from the API
 */
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/${STORE_ID}/products`);
  
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  
  return res.json();
}

/**
 * Fetch all categories from the API
 */
export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/${STORE_ID}/categories`);
  
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  
  return res.json();
}

/**
 * Fetch all billboards from the API
 */
export async function getBillboards(): Promise<Billboard[]> {
  const res = await fetch(`${API_URL}/${STORE_ID}/billboards`);
  
  if (!res.ok) {
    throw new Error("Failed to fetch billboards");
  }
  
  return res.json();
}
