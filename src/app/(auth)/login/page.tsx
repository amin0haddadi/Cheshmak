import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata-helpers";
import { LoginContent } from "@/features/auth/components/login-content";

export const metadata: Metadata = generatePageMetadata({
  title: "ورود",
  description:
    "وارد حساب کاربری خود شوید تا به پیشنهادهای ویژه و به‌روزرسانی‌های محصولات زیبایی دسترسی داشته باشید.",
  url: "/login",
  keywords: ["ورود", "حساب کاربری", "لاگین", "احراز هویت"],
});

export default function LoginPage() {
  return <LoginContent />;
}
