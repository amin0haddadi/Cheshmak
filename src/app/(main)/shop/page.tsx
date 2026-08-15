import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata-helpers";
import { PageHeader } from "@/components/ui/page-header";
import { ShopContent } from "@/features/shop/components/shop-content";

export const metadata: Metadata = generatePageMetadata({
  title: "فروشگاه",
  description:
    "مرور و خرید محصولات زیبایی و مراقبت پوست. مجموعه گسترده‌ای از لوازم آرایشی، محصولات مراقبت پوست، مو، عطر و اسپا با بهترین قیمت‌ها.",
  image: "/assets/img/shop-decor.jpg",
  url: "/shop",
  keywords: [
    "فروشگاه زیبایی",
    "خرید لوازم آرایشی",
    "محصولات مراقبت پوست",
    "آرایش",
    "عطر",
    "اسپا",
    "خرید آنلاین",
  ],
});

interface ShopPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ShopPage({ searchParams }: ShopPageProps) {
  return (
    <>
      <PageHeader
        title="فروشگاه"
        breadcrumbs={[{ label: "خانه", href: "/" }, { label: "فروشگاه" }]}
      />
      <ShopContent searchParams={searchParams} />
    </>
  );
}
