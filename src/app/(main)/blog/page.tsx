import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { generatePageMetadata } from "@/lib/metadata-helpers";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = generatePageMetadata({
  title: "وبلاگ زیبایی",
  description:
    "مقالات و راهنمای‌های تخصصی در زمینه زیبایی، مراقبت پوست، آرایش و سلامت. نکات و ترفندهای حرفه‌ای برای داشتن پوست و موی سالم و زیبا.",
  image: "/assets/img/blog-img1.jpg",
  url: "/blog",
  type: "article",
  keywords: [
    "وبلاگ زیبایی",
    "مقالات زیبایی",
    "راهنمای مراقبت پوست",
    "نکات آرایشی",
    "سلامت پوست",
  ],
});

const blogPosts = [
  {
    id: "1",
    slug: "skincare-routine-for-beginners",
    title: "راهنمای کامل مراقبت از پوست برای مبتدیان",
    image: "/assets/img/blog-img1.jpg",
    date: "۱۵ آذر ۱۴۰۳",
    author: "سارا محمدی",
    category: "مراقبت پوست",
    excerpt:
      "شروع یک روتین مراقبت از پوست می‌تواند دلهره‌آور باشد. این راهنمای ما برای ساختن یک روتین ساده و موثر است.",
  },
  {
    id: "2",
    slug: "makeup-trends-2024",
    title: "برترین ترندهای آرایش در سال ۱۴۰۳",
    image: "/assets/img/blog-img2.jpg",
    date: "۱۰ آذر ۱۴۰۳",
    author: "مریم احمدی",
    category: "آرایش",
    excerpt:
      "از پوست شیشه‌ای تا لب‌های جسورانه، ترندهای آرایشی که امسال زیبایی را تعریف می‌کنند را کشف کنید.",
  },
  {
    id: "3",
    slug: "natural-ingredients-guide",
    title: "راهنمای مواد زیبایی طبیعی",
    image: "/assets/img/blog-img3.jpg",
    date: "۵ آذر ۱۴۰۳",
    author: "علی رضایی",
    category: "مواد تشکیل‌دهنده",
    excerpt:
      "درباره مواد طبیعی که می‌توانند روتین زیبایی شما را متحول کنند و دلیل کارآمدی آن‌ها بیاموزید.",
  },
  {
    id: "4",
    slug: "hair-care-winter-tips",
    title: "مراقبت از مو در زمستان",
    image: "/assets/img/blog-img4.jpg",
    date: "۲۸ آبان ۱۴۰۳",
    author: "لیلا کریمی",
    category: "مراقبت مو",
    excerpt:
      "هوای سرد می‌تواند برای موهای شما سخت باشد. نکات برتر ما برای حفظ سلامت مو در طول زمستان.",
  },
  {
    id: "5",
    slug: "self-care-sunday-routine",
    title: "روتین کامل مراقبت از خود در یکشنبه‌ها",
    image: "/assets/img/blog-img5.jpg",
    date: "۲۰ آبان ۱۴۰۳",
    author: "سارا محمدی",
    category: "سلامت",
    excerpt:
      "یکشنبه‌های خود را با راهنمای گام به گام ما به یک آیین مراقبت از خود تبدیل کنید.",
  },
  {
    id: "6",
    slug: "fragrance-layering-tips",
    title: "هنر لایه‌بندی عطر",
    image: "/assets/img/blog-img6.jpg",
    date: "۱۵ آبان ۱۴۰۳",
    author: "مریم احمدی",
    category: "عطر",
    excerpt:
      "کشف کنید چگونه با تسلط بر هنر لایه‌بندی عطر، عطر امضای خود را بسازید.",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="وبلاگ زیبایی"
        breadcrumbs={[
          { label: "خانه", href: "/" },
          { label: "وبلاگ" },
        ]}
      />
      <div className="py-8 lg:py-12">
        <div className="container-custom">

        {/* Featured Post */}
        <div className="mb-12">
          <Link
            href={`/blog/${blogPosts[0].slug}`}
            className="group grid md:grid-cols-2 gap-6 bg-card rounded-2xl overflow-hidden border"
          >
            <div className="relative aspect-[4/3] md:aspect-auto">
              <Image
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                <span className="text-primary font-medium">
                  {blogPosts[0].category}
                </span>
                <span>•</span>
                <span>{blogPosts[0].date}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                {blogPosts[0].title}
              </h2>
              <p className="text-muted-foreground mb-4">
                {blogPosts[0].excerpt}
              </p>
                <p className="text-sm text-muted-foreground">
                  نویسنده: {blogPosts[0].author}
                </p>
            </div>
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-card rounded-xl overflow-hidden border"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                  <span className="text-primary font-medium">
                    {post.category}
                  </span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

