import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata-helpers";
import { PageHeader } from "@/components/ui/page-header";
import { CartContent } from "@/features/cart/components/cart-content";

export const metadata: Metadata = generatePageMetadata({
  title: "سبد خرید",
  description:
    "مرور و مدیریت سبد خرید خود. محصولات انتخابی خود را بررسی کنید و به مرحله پرداخت بروید.",
  url: "/cart",
  keywords: ["سبد خرید", "خرید", "پرداخت"],
});

export default function CartPage() {
  return (
    <>
      <PageHeader
        title="سبد خرید"
        breadcrumbs={[
          { label: "خانه", href: "/" },
          { label: "سبد خرید" },
        ]}
      />
      <CartContent />
    </>
  );
}

