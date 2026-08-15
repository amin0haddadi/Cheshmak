import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata-helpers";
import { brand } from "@/config/brand";
import { Banner } from "@/features/landing/components/banner";
import { TrendingProducts } from "@/features/landing/components/trending-products";
import { BrandLogos } from "@/features/landing/components/brand-logos";
import { DiscountSection } from "@/features/landing/components/discount-section";
import { Advantages } from "@/features/landing/components/advantages";
import { TopCategories } from "@/features/landing/components/top-categories";
import { NewArrivals } from "@/features/landing/components/new-arrivals";
import { Subscribe } from "@/features/landing/components/subscribe";
import { InstagramFeed } from "@/features/landing/components/instagram-feed";

export const metadata: Metadata = generatePageMetadata({
  title: "خانه",
  description: brand.description,
  image: "/assets/img/main-bg.jpg",
  url: "/",
  keywords: [...brand.keywords, "خرید آنلاین"],
});

export default function HomePage() {
  return (
    <>
      <Banner />
      <TrendingProducts />
      <BrandLogos />
      <DiscountSection />
      <Advantages />
      <TopCategories />
      <NewArrivals />
      <Subscribe />
      <InstagramFeed />
    </>
  );
}

