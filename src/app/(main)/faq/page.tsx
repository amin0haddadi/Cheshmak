import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generatePageMetadata } from "@/lib/metadata-helpers";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = generatePageMetadata({
  title: "سوالات متداول",
  description:
    "پاسخ به سوالات متداول درباره محصولات، سفارشات، ارسال، بازگشت کالا و خدمات ما. اگر سوالی دارید، اینجا را بررسی کنید.",
  url: "/faq",
  keywords: ["سوالات متداول", "FAQ", "راهنما", "پشتیبانی"],
});

const faqCategories = [
  {
    title: "سفارشات و ارسال",
    faqs: [
      {
        question: "ارسال چقدر طول می‌کشد؟",
        answer:
          "ارسال استاندارد معمولاً ۳ تا ۵ روز کاری طول می‌کشد. ارسال اکسپرس برای تحویل ۱ تا ۲ روزه در دسترس است.",
      },
      {
        question: "آیا ارسال رایگان دارید؟",
        answer:
          "بله! ما ارسال رایگان استاندارد برای تمام سفارشات بالای ۹۹۰,۰۰۰ تومان ارائه می‌دهیم.",
      },
      {
        question: "آیا می‌توانم سفارشم را پیگیری کنم؟",
        answer:
          "قطعاً! پس از ارسال سفارش، یک ایمیل با اطلاعات پیگیری دریافت خواهید کرد. همچنین می‌توانید با ورود به حساب کاربری سفارش خود را پیگیری کنید.",
      },
    ],
  },
  {
    title: "مرجوعی و بازپرداخت",
    faqs: [
      {
        question: "سیاست مرجوعی شما چیست؟",
        answer:
          "ما سیاست مرجوعی ۳۰ روزه برای محصولات استفاده نشده و باز نشده ارائه می‌دهیم. کالاها باید در بسته‌بندی اصلی خود باشند.",
      },
      {
        question: "چگونه مرجوعی را شروع کنم؟",
        answer:
          "برای شروع مرجوعی، به حساب کاربری خود وارد شوید، به تاریخچه سفارشات بروید و کالایی را که می‌خواهید برگردانید انتخاب کنید.",
      },
      {
        question: "کی بازپرداخت دریافت می‌کنم؟",
        answer:
          "پس از دریافت و بررسی مرجوعی شما، بازپرداخت‌ها در عرض ۵ تا ۷ روز کاری پردازش می‌شوند.",
      },
    ],
  },
  {
    title: "محصولات و مواد تشکیل‌دهنده",
    faqs: [
      {
        question: "آیا محصولات شما بدون آزمایش روی حیوانات هستند؟",
        answer:
          "بله! ما متعهد به زیبایی بدون آزار حیوانات هستیم. هیچ یک از محصولات یا مواد ما روی حیوانات آزمایش نمی‌شوند.",
      },
      {
        question: "آیا محصولات شما برای پوست حساس مناسب هستند؟",
        answer:
          "بسیاری از محصولات ما برای پوست حساس فرموله شده‌اند. به دنبال محصولاتی با برچسب 'ملایم' یا 'برای پوست حساس' باشید.",
      },
      {
        question: "آیا محصولات گیاهی دارید؟",
        answer:
          "بله! ما طیف گسترده‌ای از محصولات گیاهی ارائه می‌دهیم. می‌توانید با فیلتر 'گیاهی' در صفحه فروشگاه جستجو کنید.",
      },
    ],
  },
  {
    title: "حساب کاربری و پرداخت",
    faqs: [
      {
        question: "چه روش‌های پرداختی قبول می‌کنید؟",
        answer:
          "ما تمام کارت‌های اعتباری اصلی، درگاه‌های پرداخت آنلاین و پرداخت در محل را قبول می‌کنیم. تمام تراکنش‌ها به صورت امن رمزگذاری می‌شوند.",
      },
      {
        question: "آیا خرید از وبسایت شما امن است؟",
        answer:
          "قطعاً! ما از رمزگذاری SSL استاندارد صنعت برای محافظت از اطلاعات شخصی و پرداخت شما استفاده می‌کنیم.",
      },
      {
        question: "چگونه رمز عبورم را بازیابی کنم؟",
        answer:
          "روی 'فراموشی رمز عبور' در صفحه ورود کلیک کنید و آدرس ایمیل خود را وارد کنید. یک لینک برای بازیابی رمز عبور دریافت خواهید کرد.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <PageHeader
        title="سوالات متداول"
        breadcrumbs={[
          { label: "خانه", href: "/" },
          { label: "سوالات متداول" },
        ]}
      />
      <div className="py-8 lg:py-12">
        <div className="container-custom">

        {/* FAQ Sections */}
        <div className="max-w-3xl mx-auto space-y-8">
          {faqCategories.map((category) => (
            <div key={category.title}>
              <h2 className="text-xl font-semibold mb-4">{category.title}</h2>
              <Accordion type="single" collapsible className="bg-card rounded-xl border">
                {category.faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`${category.title}-${index}`}
                    className="px-6"
                  >
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16 p-8 bg-muted/50 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">هنوز سوالی دارید؟</h2>
          <p className="text-muted-foreground mb-6">
            تیم پشتیبانی ما آماده کمک به شما در هر سوال یا نگرانی است.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            تماس با پشتیبانی
          </a>
        </div>
      </div>
    </div>
    </>
  );
}

