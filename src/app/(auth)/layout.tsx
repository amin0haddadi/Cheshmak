import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto w-full max-w-md">
          <Link href="/" className="flex justify-center mb-8">
            <div className="relative">
              <Image
                src="/assets/img/logo.png"
                alt="خانم خانما"
                width={180}
                height={60}
                priority
                style={{
                  filter: 'brightness(0) saturate(100%) invert(18%) sepia(90%) saturate(2500%) hue-rotate(320deg) brightness(0.75) contrast(1.2)',
                }}
              />
            </div>
          </Link>
          {children}
        </div>
      </div>

      {/* Right - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/assets/img/login-form__bg.png"
          alt="Beauty products"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" />
      </div>
    </div>
  );
}

