import type { Category } from "@/types";
import { api } from "../client";
import type { ApiCategoriesResponse } from "./types";
import { transformApiCategory } from "./transformers";

/**
 * Get all categories without products
 * Endpoint: GET /api/categories/all
 */
export async function getCategories(): Promise<Category[]> {
  const response = await api.get<ApiCategoriesResponse>("/categories/all");
  return response.data.map(transformApiCategory);
}

