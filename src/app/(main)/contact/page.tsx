import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata-helpers";
import { PageHeader } from "@/components/ui/page-header";
import { ContactContent } from "@/features/contact/components/contact-content";

export const metadata: Metadata = generatePageMetadata({
  title: "تماس با ما",
  description:
    "با ما تماس بگیرید. ما اینجا هستیم تا به سوالات شما پاسخ دهیم و در خرید محصولات زیبایی به شما کمک کنیم. اطلاعات تماس و فرم ارتباط با ما.",
  url: "/contact",
  keywords: ["تماس", "پشتیبانی", "ارتباط با ما", "اطلاعات تماس"],
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="تماس با ما"
        breadcrumbs={[
          { label: "خانه", href: "/" },
          { label: "تماس با ما" },
        ]}
      />
      <ContactContent />
    </>
  );
}

