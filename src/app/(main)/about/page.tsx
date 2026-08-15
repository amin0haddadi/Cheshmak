import type { Metadata } from "next";
import Image from "next/image";
import { generatePageMetadata } from "@/lib/metadata-helpers";
import { Advantages } from "@/features/landing/components/advantages";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = generatePageMetadata({
  title: "درباره ما",
  description:
    "درباره خانم خانما - ما با ماموریت ساده‌ای شروع کردیم: در دسترس قرار دادن محصولات زیبایی با کیفیت برای همه. از یک فروشگاه کوچک آنلاین به یک مقصد محبوب برای علاقه‌مندان به زیبایی در سراسر جهان تبدیل شدیم.",
  image: "/assets/img/info-item-img1.jpg",
  url: "/about",
  keywords: ["درباره ما", "تاریخچه", "ماموریت", "ارزش‌ها"],
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
                Since 2015
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Journey
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  خانم خانما با ماموریت ساده‌ای شروع کرد: در دسترس قرار دادن
                  محصولات زیبایی با کیفیت برای همه. آنچه به عنوان یک فروشگاه
                  کوچک آنلاین شروع شد، به یک مقصد محبوب برای علاقه‌مندان به
                  زیبایی در سراسر جهان تبدیل شده است.
                </p>
                <p>
                  We carefully curate our collection, partnering with brands
                  that share our commitment to quality, sustainability, and
                  innovation. Every product in our catalog is selected with care
                  and tested to meet our high standards.
                </p>
                <p>
                  Today, we serve thousands of customers across the globe,
                  helping them discover products that enhance their natural
                  beauty and boost their confidence.
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
              What We Stand For
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Our Values</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-muted-foreground">
                We prioritize eco-friendly products and packaging, working
                towards a more sustainable future for beauty.
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p className="text-muted-foreground">
                Every product is carefully vetted to ensure it meets our high
                standards for effectiveness and safety.
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💜</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Inclusivity</h3>
              <p className="text-muted-foreground">
                Beauty is for everyone. We offer products for all skin types,
                tones, and preferences.
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
                Meet the Team
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Passionate About Beauty
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Our team is made up of beauty enthusiasts, skincare experts,
                  and customer service professionals who are dedicated to
                  helping you find the perfect products.
                </p>
                <p>
                  From our buyers who travel the world to discover new brands,
                  to our customer care team who&apos;s always ready to help,
                  هر عضو خانواده خانم خانما متعهد به رضایت شما است.
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

