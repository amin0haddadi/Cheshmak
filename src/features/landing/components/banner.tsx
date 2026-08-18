import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Banner() {
  return (
    <section className="relative min-h-screen flex items-end justify-start md:items-center md:justify-end w-full pb-10 md:pt-[340px] md:pb-[237px] 2xl:pt-[180px] 2xl:pb-[180px]">
      {/* Background Image - Different image for mobile */}
      <div className="absolute inset-0 z-0">
        {/* Mobile background */}
        <Image
          src="/assets/img/dark-main-hero-sm.jpg"
          alt="فروشگاه عینک چشمک"
          fill
          className="object-cover object-center md:hidden"
          priority
        />
        {/* Desktop background */}
        <Image
          src="/assets/img/dark-main-hero.jpg"
          alt="فروشگاه عینک چشمک"
          fill
          className="object-cover object-center hidden md:block"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 md:pb-6 md:w-auto md:px-[80px] md:pb-0">
        <div className="flex flex-col items-start text-start max-w-[575px] md:max-w-[685px] lg:max-w-xl ">
          <span className="block text-metal font-display text-[45px] md:text-[60px] hidden md:block">
            حرفه‌ای
          </span>
          <h1 className="text-[58px] md:text-[70px] font-bold text-[#222222] leading-tight hidden md:block">
            عینک و فریم
          </h1>
          <p className="text-[16px] md:text-[20px] text-white mt-4 max-w-[465px] leading-[180%] hidden md:block">
            عینک طبی، آفتابی و فریم‌های روز را در چشمک پیدا کنید. با پیشنهادهایی
            که نمی‌توانید رد کنید.
          </p>
          <Button
            asChild
            size="xl"
            className="mt-[30px] md:mt-[60px] w-full md:w-auto bg-metal-50 text-white"
          >
            <Link href="/shop">همین حالا خرید کنید</Link>
          </Button>
        </div>
      </div>

      {/* Decorative Element - Hidden on mobile */}
      <div className="absolute left-0 top-[36%] w-[42.4%] z-0 hidden md:block pointer-events-none">
        <Image
          src="/assets/img/main-block-decor.png"
          alt=""
          width={600}
          height={400}
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}


