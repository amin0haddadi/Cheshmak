import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata-helpers";
import { PageHeader } from "@/components/ui/page-header";
import { ProfileContent } from "@/features/profile/components/profile-content";

export const metadata: Metadata = generatePageMetadata({
  title: "حساب کاربری",
  description:
    "مدیریت حساب کاربری، مشاهده سفارش‌ها، آدرس‌ها و تنظیمات شخصی خود.",
  url: "/profile",
  keywords: ["حساب کاربری", "پروفایل", "سفارش‌ها", "آدرس"],
});

export default function ProfilePage() {
  return (
    <>
      <PageHeader
        title="حساب کاربری"
        breadcrumbs={[
          { label: "خانه", href: "/" },
          { label: "حساب کاربری" },
        ]}
      />
      <ProfileContent />
    </>
  );
}

