import Link from "next/link";
import Image from "next/image";
import { BrandLogo } from "@/components/layout/brand-logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gradient-to-l from-primary/80 to-mark/10">
      {/* Left - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto w-full max-w-md">
          <Link href="/" className="flex justify-center mb-8">
            <BrandLogo className="h-16 aspect-[1087/535]" />
          </Link>
          {children}
        </div>
      </div>

      {/* Right - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
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

