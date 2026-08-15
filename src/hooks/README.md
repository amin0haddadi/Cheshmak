# React Query Hooks

This directory contains custom React Query hooks for data fetching.

## Available Hooks

### Products

- `useProducts()` - Fetch all products
- `useProduct(id)` - Fetch a single product by ID

## Usage Examples

### Basic Product List

```tsx
"use client";

import { useProducts } from "@/hooks/queries/products";

export function ProductList() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {products?.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Single Product

```tsx
"use client";

import { useProduct } from "@/hooks/queries/products";

export function ProductDetails({ productId }: { productId: string }) {
  const { data: product, isLoading } = useProduct(productId);

  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return <div>{product.name}</div>;
}
```


## Folder Structure

```
src/hooks/
  ├── queries/              # React Query hooks (data fetching)
  │   └── products/
  │       ├── index.ts
  │       ├── query-keys.ts
  │       └── use-*.ts
  ├── use-media-query.ts    # Utility hooks (non-query)
  └── use-scroll-lock.ts
```

## Creating New Query Hooks

Follow the component-driven architecture pattern:

1. Add API functions in `src/lib/api/[resource]/` folder (one file per endpoint)
2. Create hooks folder in `src/hooks/queries/[resource]/` with:
   - `query-keys.ts` - Centralized query keys
   - `use-[action].ts` - Individual hook files
   - `index.ts` - Barrel export
3. Use query keys pattern for cache management

Example:

```tsx
// src/lib/api/categories/get-categories.ts
export async function getCategories() {
  return api.get<Category[]>("/categories");
}

// src/hooks/queries/categories/query-keys.ts
export const categoryKeys = {
  all: ["categories"] as const,
  lists: () => [...categoryKeys.all, "list"] as const,
};

// src/hooks/queries/categories/use-categories.ts
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api/categories";
import { categoryKeys } from "./query-keys";

export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: getCategories,
  });
}

// src/hooks/queries/categories/index.ts
export { categoryKeys } from "./query-keys";
export { useCategories } from "./use-categories";
```

