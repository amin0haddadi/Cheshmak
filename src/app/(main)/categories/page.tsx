import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata-helpers";
import { PageHeader } from "@/components/ui/page-header";
import { CategoriesContent } from "@/features/categories/components/categories-content";

export const metadata: Metadata = generatePageMetadata({
  title: "دسته‌بندی‌ها",
  description:
    "مرور دسته‌بندی‌های عینک: طبی، آفتابی، مطالعه، بچه‌گانه و فریم‌های روز. پیدا کردن مدل مناسب را آسان کنید.",
  image: "/assets/img/top-categories-img1.jpg",
  url: "/categories",
  keywords: [
    "دسته‌بندی عینک",
    "عینک طبی",
    "عینک آفتابی",
    "عینک مطالعه",
    "فریم",
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

