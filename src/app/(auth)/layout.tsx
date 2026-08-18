import Link from "next/link";
import Image from "next/image";
import { BrandLogo } from "@/components/layout/brand-logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gradient-to-l from-primary/80 to-mark/10">
      {/* Left - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          <Link href="/" className="mb-8 flex justify-center">
            <BrandLogo className="aspect-[1087/535] h-16" />
          </Link>
          {children}
        </div>
      </div>

      {/* Right - Image */}
      <div className="relative hidden lg:block lg:w-1/2">
        <Image
          src="/assets/img/login-form__bg.png"
          alt="فروشگاه عینک چشمک"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" />
      </div>
    </div>
  );
}

