import type { Metadata } from "next";
import Image from "next/image";
import { generatePageMetadata } from "@/lib/metadata-helpers";
import { Advantages } from "@/features/landing/components/advantages";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = generatePageMetadata({
  title: "درباره ما",
  description:
    "درباره چشمک - فروشگاه آنلاین عینک طبی، آفتابی و فریم. ما کمک می‌کنیم مدل مناسب صورت و سبک شما را راحت‌تر پیدا کنید.",
  image: "/assets/img/info-item-img1.jpg",
  url: "/about",
  keywords: ["درباره ما", "چشمک", "فروشگاه عینک", "ماموریت", "ارزش‌ها"],
});

export default function AboutPage() {
  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title="درباره ما"
        breadcrumbs={[
          { label: "خانه", href: "/" },
          { label: "درباره ما" },
        ]}
      />

      {/* Story Section */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-primary font-display text-lg italic mb-2">
                از ۲۰۱۵
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                مسیر ما
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  چشمک با ماموریت ساده‌ای شروع کرد: در دسترس قرار دادن
                  عینک باکیفیت برای همه. آنچه به عنوان یک فروشگاه
                  کوچک آنلاین شروع شد، به مقصدی برای انتخاب عینک طبی،
                  آفتابی و فریم‌های روز تبدیل شده است.
                </p>
                <p>
                  مجموعه ما را با دقت انتخاب می‌کنیم و با برندهایی کار می‌کنیم
                  که کیفیت، راحتی و طراحی را جدی می‌گیرند. هر فریم قبل از
                  قرار گرفتن در فروشگاه بررسی می‌شود.
                </p>
                <p>
                  امروز به مشتریانی کمک می‌کنیم مدل مناسب صورت، سبک و
                  بودجه خود را پیدا کنند و با اطمینان خرید کنند.
                </p>
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="/assets/img/info-item-img1.jpg"
                alt="Our story"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block text-primary font-display text-lg italic mb-2">
              ارزش‌های ما
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">آنچه برایمان مهم است</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">پایداری</h3>
              <p className="text-muted-foreground">
                به بسته‌بندی مسئولانه و انتخاب برندهایی که دوام محصول را جدی
                می‌گیرند اهمیت می‌دهیم.
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">کیفیت</h3>
              <p className="text-muted-foreground">
                هر فریم از نظر ساخت، راحتی و دوام بررسی می‌شود تا استاندارد
                چشمک را داشته باشد.
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💜</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">تنوع مدل‌ها</h3>
              <p className="text-muted-foreground">
                عینک برای همه است. مدل‌هایی برای صورت‌ها، سبک‌ها و بودجه‌های
                مختلف ارائه می‌دهیم.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden order-2 lg:order-1">
              <Image
                src="/assets/img/info-item-img2.jpg"
                alt="Our team"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="inline-block text-primary font-display text-lg italic mb-2">
                تیم چشمک
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                علاقه‌مند به دنیای عینک
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  تیم ما از مشاوران انتخاب فریم، کارشناسان بینایی‌سنجی و پشتیبانی
                  تشکیل شده که کمک می‌کنند مدل مناسب خود را پیدا کنید.
                </p>
                <p>
                  از خریداران مجموعه تا تیم پشتیبانی،
                  هر عضو خانواده چشمک متعهد به رضایت شما است.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <Advantages />
    </div>
  );
}

