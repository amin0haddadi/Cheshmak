import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata-helpers";
import { PageHeader } from "@/components/ui/page-header";
import { CheckoutContent } from "@/features/checkout/components/checkout-content";

export const metadata: Metadata = generatePageMetadata({
  title: "تسویه حساب",
  description:
    "تکمیل اطلاعات ارسال و پرداخت برای تکمیل سفارش خود. امن و سریع.",
  url: "/checkout",
  keywords: ["تسویه حساب", "پرداخت", "سفارش"],
});

export default function CheckoutPage() {
  return (
    <>
      <PageHeader
        title="تسویه حساب"
        breadcrumbs={[
          { label: "خانه", href: "/" },
          { label: "تسویه حساب" },
        ]}
      />
      <CheckoutContent />
    </>
  );
}

