import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata-helpers";
import { PageHeader } from "@/components/ui/page-header";
import { ShopContent } from "@/features/shop/components/shop-content";

export const metadata: Metadata = generatePageMetadata({
  title: "فروشگاه",
  description:
    "مرور و خرید عینک طبی، آفتابی و فریم. مجموعه چشمک با مدل‌های روز و قیمت مناسب.",
  image: "/assets/img/shop-decor.jpg",
  url: "/shop",
  keywords: [
    "فروشگاه عینک",
    "خرید عینک",
    "عینک طبی",
    "عینک آفتابی",
    "فریم عینک",
    "لنز",
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
