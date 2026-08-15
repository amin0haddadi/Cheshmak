import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata-helpers";
import { PageHeader } from "@/components/ui/page-header";
import { CategoriesContent } from "@/features/categories/components/categories-content";

export const metadata: Metadata = generatePageMetadata({
  title: "دسته‌بندی‌ها",
  description:
    "مرور دسته‌بندی‌های مختلف محصولات زیبایی: آرایش، مراقبت پوست، مو، عطر، اسپا و ناخن. پیدا کردن محصولات مورد علاقه خود را آسان کنید.",
  image: "/assets/img/top-categories-img1.jpg",
  url: "/categories",
  keywords: [
    "دسته‌بندی محصولات",
    "آرایش",
    "مراقبت پوست",
    "مو",
    "عطر",
    "اسپا",
    "ناخن",
  ],
});

export default function CategoriesPage() {
  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="دسته‌بندی‌ها"
        breadcrumbs={[
          { label: "خانه", href: "/" },
          { label: "دسته‌بندی‌ها" },
        ]}
      />

      <CategoriesContent />
    </>
  );
}

