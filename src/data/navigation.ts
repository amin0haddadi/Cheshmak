import type { NavItem, FooterNav, SocialLink } from "@/types";

export const mainNavItems: NavItem[] = [
  { name: "خانه", path: "/" },
  {
    name: "فروشگاه",
    path: "/shop",
    children: [
      { name: "همه محصولات", path: "/shop" },
      { name: "جدیدترین‌ها", path: "/shop?filter=new" },
      { name: "حراج", path: "/shop?filter=sale" },
    ],
  },
  { name: "دسته‌بندی‌ها", path: "/categories" },
  { name: "درباره ما", path: "/about" },
  { name: "وبلاگ", path: "/blog" },
  { name: "تماس با ما", path: "/contact" },
];

export const footerNavItems: FooterNav[] = [
  {
    title: "شرکت",
    links: [
      { name: "درباره ما", path: "/about" },
      { name: "فرصت‌های شغلی", path: "/careers" },
      { name: "شعب فروشگاه", path: "/locations" },
      { name: "وبلاگ ما", path: "/blog" },
      { name: "نظرات مشتریان", path: "/reviews" },
    ],
  },
  {
    title: "راهنما",
    links: [
      { name: "تماس با ما", path: "/contact" },
      { name: "سوالات متداول", path: "/faq" },
      { name: "ارسال سفارش", path: "/delivery" },
      { name: "مرجوعی", path: "/returns" },
      { name: "پیگیری سفارش", path: "/track-order" },
    ],
  },
  {
    title: "فروشگاه",
    links: [
      { name: "جدیدترین‌ها", path: "/shop?filter=new" },
      { name: "پرفروش‌ترین‌ها", path: "/shop?filter=trending" },
      { name: "حراج", path: "/shop?filter=sale" },
      { name: "کارت هدیه", path: "/gift-cards" },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  { name: "فیسبوک", icon: "facebook", path: "https://facebook.com" },
  { name: "توییتر", icon: "twitter", path: "https://twitter.com" },
  { name: "اینستاگرام", icon: "instagram", path: "https://instagram.com" },
  { name: "پینترست", icon: "pinterest", path: "https://pinterest.com" },
];

export const paymentMethods = [
  { name: "ویزا", icon: "/assets/img/payment1.png" },
  { name: "مسترکارت", icon: "/assets/img/payment2.png" },
  { name: "پی‌پال", icon: "/assets/img/payment3.png" },
  { name: "اپل پی", icon: "/assets/img/payment4.png" },
];


