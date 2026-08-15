import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata-helpers";
import { PageHeader } from "@/components/ui/page-header";
import { WishlistContent } from "@/features/wishlist/components/wishlist-content";

export const metadata: Metadata = generatePageMetadata({
  title: "لیست علاقه‌مندی‌ها",
  description:
    "محصولات مورد علاقه خود را ذخیره کنید و بعداً خریداری کنید. لیست علاقه‌مندی‌های شما در یک مکان.",
  url: "/wishlist",
  keywords: ["علاقه‌مندی", "ذخیره", "لیست خرید"],
});

export default function WishlistPage() {
  return (
    <>
      <PageHeader
        title="لیست علاقه‌مندی‌ها"
        breadcrumbs={[
          { label: "خانه", href: "/" },
          { label: "لیست علاقه‌مندی‌ها" },
        ]}
      />
      <WishlistContent />
    </>
  );
}

