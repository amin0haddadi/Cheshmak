import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata-helpers";
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
  description:
    "پوست خود را با محصولات آرایشی بدون سموم تغذیه کنید. محصولات زیبایی و مراقبت حرفه‌ای با پیشنهادهایی که نمی‌توانید رد کنید.",
  image: "/assets/img/main-bg.jpg",
  url: "/",
  keywords: [
    "زیبایی",
    "لوازم آرایشی",
    "مراقبت پوست",
    "آرایش",
    "مراقبت مو",
    "عطر",
    "اسپا",
    "خرید آنلاین",
  ],
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

