import type { Metadata } from 'next';
import { Suspense } from 'react';
import { generatePageMetadata } from '@/lib/metadata-helpers';
import { LoginContent } from '@/features/auth/components/login-content';
import { Loading } from '@/components/ui/loading';

export const metadata: Metadata = generatePageMetadata({
  title: 'ورود',
  description:
    'وارد حساب کاربری خود شوید تا به پیشنهادهای ویژه و به‌روزرسانی‌های فروشگاه عینک دسترسی داشته باشید.',
  url: '/login',
  keywords: ['ورود', 'حساب کاربری', 'لاگین', 'احراز هویت'],
});

export default function LoginPage() {
  return (
    <Suspense fallback={<Loading message="در حال بارگذاری..." />}>
      <LoginContent />
    </Suspense>
  );
}
