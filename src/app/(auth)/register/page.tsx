import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata-helpers";
import { RegisterContent } from "@/features/auth/components/register-content";

export const metadata: Metadata = generatePageMetadata({
  title: "ثبت نام",
  description:
    "به چشمک بپیوندید. حساب کاربری خود را ایجاد کنید و از پیشنهادهای ویژه و به‌روزرسانی‌های فروشگاه عینک بهره‌مند شوید.",
  url: "/register",
  keywords: ["ثبت نام", "ایجاد حساب", "عضویت", "حساب کاربری"],
});

export default function RegisterPage() {
  return <RegisterContent />;
}

