import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function DiscountSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/img/discount-bg.jpg"
          alt="Discount background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-xl text-center mx-auto text-white">
          <span className="inline-block font-display text-xl mb-4 text-primary-foreground/80">
            پیشنهاد ویژه محدود
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            ۳۰٪ تخفیف
          </h2>
          <p className="text-lg text-white/80 mb-8">
            روی همه محصولات زیبایی در این فصل. از کد تخفیف{" "}
            <span className="font-bold text-white">KHANOOMKHANOOMA2024</span> استفاده کنید.
          </p>
          <Button asChild size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-foreground">
            <Link href="/shop?filter=sale">خرید حراجی</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

