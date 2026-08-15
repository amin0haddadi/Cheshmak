# Component-Driven Architecture Guidelines

## Core Principles

### 1. **Pages are Server Components**
- All `page.tsx` files should be **server components** (no `"use client"`)
- Pages export metadata directly: `export const metadata: Metadata = ...`
- Pages are clean and only compose feature components
- Pages handle data fetching and pass props to components

### 2. **Feature Components Handle Client Logic**
- Interactive components are in `src/features/[feature]/components/`
- Client components are marked with `"use client"` directive
- Feature components encapsulate all interactive logic (state, hooks, event handlers)
- Components are reusable and self-contained

### 3. **Structure Pattern**

```
src/
├── app/
│   └── (main)/
│       └── shop/
│           └── page.tsx          ← Server component (exports metadata)
├── features/
│   └── shop/
│       └── components/
│           └── shop-content.tsx  ← Client component (handles interactivity)
```

### 4. **Page Template**

```typescript
// src/app/(main)/shop/page.tsx
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata-helpers";
import { PageHeader } from "@/components/ui/page-header";
import { ShopContent } from "@/features/shop/components/shop-content";

export const metadata: Metadata = generatePageMetadata({
  title: "Shop",
  description: "...",
  url: "/shop",
});

export default function ShopPage() {
  return (
    <>
      <PageHeader title="Shop" breadcrumbs={[...]} />
      <ShopContent />
    </>
  );
}
```

### 5. **Feature Component Template**

```typescript
// src/features/shop/components/shop-content.tsx
"use client";

import { useState } from "react";
// ... imports

export function ShopContent() {
  const [state, setState] = useState();
  // ... all client logic here
  
  return (
    <div>
      {/* Component UI */}
    </div>
  );
}
```

## Benefits

✅ **SEO Optimized**: Pages are server components, metadata exported directly  
✅ **Clean Pages**: Pages are simple, just compose components  
✅ **Reusable Components**: Feature components can be used anywhere  
✅ **Better Performance**: Server components by default, client only where needed  
✅ **Maintainable**: Clear separation of concerns  

## Rules to Remember

1. ❌ **Never** use `"use client"` in `page.tsx` files
2. ✅ **Always** export metadata from `page.tsx` files
3. ✅ **Always** create feature components for interactive logic
4. ✅ **Always** keep pages clean - just import and compose components
5. ✅ Use `generateMetadata` for dynamic routes (product/[id], blog/[slug])

## Example Refactoring

**Before (Bad):**
```typescript
// page.tsx - Client component with all logic
"use client";
export default function ShopPage() {
  const [state, setState] = useState();
  // ... 200 lines of logic
}
```

**After (Good):**
```typescript
// page.tsx - Server component
export const metadata: Metadata = {...};
export default function ShopPage() {
  return <ShopContent />;
}

// shop-content.tsx - Client component
"use client";
export function ShopContent() {
  // ... all logic here
}
```

