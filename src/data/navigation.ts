import type { FooterNav, NavItem, SocialLink } from '@/types';

export const mainNavItems: NavItem[] = [
  { name: 'خانه', path: '/' },
  {
    name: 'فروشگاه',
    path: '/shop',
    children: [
      { name: 'همه محصولات', path: '/shop' },
      { name: 'جدیدترین‌ها', path: '/shop?filter=new' },
      { name: 'حراج', path: '/shop?filter=sale' },
    ],
  },
  { name: 'دسته‌بندی‌ها', path: '/categories' },
  { name: 'درباره ما', path: '/about' },
  { name: 'وبلاگ', path: '/blog' },
  { name: 'تماس با ما', path: '/contact' },
];

export const footerNavItems: FooterNav[] = [
  {
    title: 'شرکت',
    links: [
      { name: 'درباره ما', path: '/about' },
      // { name: "فرصت‌های شغلی", path: "/careers" },
      // { name: "شعب فروشگاه", path: "/locations" },
      { name: 'وبلاگ ما', path: '/blog' },
      // { name: "نظرات مشتریان", path: "/reviews" },
    ],
  },
  {
    title: 'راهنما',
    links: [
      { name: 'تماس با ما', path: '/contact' },
      { name: 'سوالات متداول', path: '/faq' },
      // { name: "ارسال سفارش", path: "/delivery" },
      // { name: "مرجوعی", path: "/returns" },
      // { name: "پیگیری سفارش", path: "/track-order" },
    ],
  },
  {
    title: 'فروشگاه',
    links: [
      { name: 'جدیدترین‌ها', path: '/shop?filter=new' },
      { name: 'پرفروش‌ترین‌ها', path: '/shop?filter=trending' },
      { name: 'حراج', path: '/shop?filter=sale' },
      // { name: "کارت هدیه", path: "/gift-cards" },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  {
    name: 'اینستاگرام',
    icon: 'instagram',
    path: 'https://www.instagram.com/barsam.boutique1',
  },
  { name: 'تلگرام', icon: 'telegram', path: 'https://t.me/barsam16' },
  {
    name: 'واتساپ',
    icon: 'whatsapp',
    path: 'https://api.whatsapp.com/message/DV2NE22YBAD4N1',
  },
];

export const paymentMethods = [
  {
    name: 'بانک ملت',
    icon: '/assets/img/Mellat.svg',
    href: 'https://www.melat.ir',
  },
  {
    name: 'زرین‌پال',
    icon: '/assets/img/dybug_payment_zarinpal.svg',
    href: 'https://www.zarinpal.com',
  },
  {
    name: 'بانک سامان',
    icon: '/assets/img/bank-saman1.svg',
    href: 'https://www.sb24.com',
  },
];
