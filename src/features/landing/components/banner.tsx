import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Banner() {
  return (
    <section className="relative flex min-h-screen w-full items-end justify-start pb-10 md:items-center md:justify-end md:pb-[237px] md:pt-[340px] 2xl:py-[180px]">
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
          className="hidden object-cover object-center md:block"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 md:w-auto md:px-[80px] md:pb-0 md:pb-6">
        <div className="flex max-w-[575px] flex-col items-start text-start md:max-w-[685px] lg:max-w-xl ">
          <span className="text-metal block hidden font-display text-[45px] md:block md:text-[60px]">
            حرفه‌ای
          </span>
          <h1 className="hidden text-[58px] font-bold leading-tight text-white md:block md:text-[70px]">
            عینک و فریم
          </h1>
          <p className="mt-4 hidden max-w-[465px] text-[16px] leading-[180%] text-white md:block md:text-[20px]">
            عینک طبی، آفتابی و فریم‌های روز را در چشمک پیدا کنید. با پیشنهادهایی
            که نمی‌توانید رد کنید.
          </p>
          <Button
            asChild
            size="xl"
            className="mt-[30px] w-full bg-metal-50 text-black md:mt-[60px] md:w-auto"
          >
            <Link href="/shop">همین حالا خرید کنید</Link>
          </Button>
        </div>
      </div>

      {/* Decorative Element - Hidden on mobile */}
      <div className="pointer-events-none absolute left-0 top-[36%] z-0 hidden w-[42.4%] md:block">
        <Image
          src="/assets/img/main-block-decor.png"
          alt=""
          width={600}
          height={400}
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}


