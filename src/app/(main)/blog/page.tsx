import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { generatePageMetadata } from "@/lib/metadata-helpers";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = generatePageMetadata({
  title: "وبلاگ",
  description:
    "مقالات و راهنمای انتخاب عینک طبی، آفتابی و فریم. نکات نگهداری و ترندهای روز فروشگاه چشمک.",
  image: "/assets/img/blog-img1.jpg",
  url: "/blog",
  type: "article",
  keywords: [
    "وبلاگ عینک",
    "راهنمای انتخاب فریم",
    "عینک طبی",
    "عینک آفتابی",
    "نگهداری عینک",
  ],
});

const blogPosts = [
  {
    id: "1",
    slug: "skincare-routine-for-beginners",
    title: "راهنمای انتخاب فریم مناسب فرم صورت",
    image: "/assets/img/blog-img1.jpg",
    date: "۱۵ آذر ۱۴۰۳",
    author: "سارا محمدی",
    category: "انتخاب فریم",
    excerpt:
      "شکل صورت نقش مهمی در انتخاب فریم دارد. در این راهنما مدل مناسب صورت گرد، کشیده و مربعی را بررسی می‌کنیم.",
  },
  {
    id: "2",
    slug: "makeup-trends-2024",
    title: "ترندهای عینک در سال ۱۴۰۳",
    image: "/assets/img/blog-img2.jpg",
    date: "۱۰ آذر ۱۴۰۳",
    author: "مریم احمدی",
    category: "ترند",
    excerpt:
      "از فریم‌های شفاف تا مدل‌های گربه‌ای، ترندهای امسال عینک را بشناسید و سبک خود را پیدا کنید.",
  },
  {
    id: "3",
    slug: "natural-ingredients-guide",
    title: "راهنمای نگهداری از عینک",
    image: "/assets/img/blog-img3.jpg",
    date: "۵ آذر ۱۴۰۳",
    author: "علی رضایی",
    category: "نگهداری",
    excerpt:
      "با چند عادت ساده، فریم و عدسی‌ها را تمیز و سالم نگه دارید و عمر عینک را بیشتر کنید.",
  },
  {
    id: "4",
    slug: "hair-care-winter-tips",
    title: "چطور عینک آفتابی مناسب انتخاب کنیم",
    image: "/assets/img/blog-img4.jpg",
    date: "۲۸ آبان ۱۴۰۳",
    author: "لیلا کریمی",
    category: "عینک آفتابی",
    excerpt:
      "محافظت UV، رنگ عدسی و شکل فریم؛ نکاتی که قبل از خرید عینک آفتابی باید بدانید.",
  },
  {
    id: "5",
    slug: "self-care-sunday-routine",
    title: "تفاوت عینک طبی و عینک آفتابی",
    image: "/assets/img/blog-img5.jpg",
    date: "۲۰ آبان ۱۴۰۳",
    author: "سارا محمدی",
    category: "راهنما",
    excerpt:
      "اگر بین مدل طبی و آفتابی مردد هستید، این مقایسه کوتاه کمک می‌کند انتخاب بهتری داشته باشید.",
  },
  {
    id: "6",
    slug: "fragrance-layering-tips",
    title: "راهنمای انتخاب عدسی عینک",
    image: "/assets/img/blog-img6.jpg",
    date: "۱۵ آبان ۱۴۰۳",
    author: "مریم احمدی",
    category: "عدسی",
    excerpt:
      "عدسی ضد بازتاب، بلوکات و فتوکرومیک چه تفاوتی دارند و کدام برای استفاده روزمره مناسب‌تر است.",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="وبلاگ"
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
            className="group grid gap-6 overflow-hidden rounded-2xl border bg-card md:grid-cols-2"
          >
            <div className="relative aspect-[4/3] md:aspect-auto">
              <Image
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-8">
              <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
                <span className="font-medium text-primary">
                  {blogPosts[0].category}
                </span>
                <span>•</span>
                <span>{blogPosts[0].date}</span>
              </div>
              <h2 className="mb-4 text-2xl font-bold transition-colors group-hover:text-primary md:text-3xl">
                {blogPosts[0].title}
              </h2>
              <p className="mb-4 text-muted-foreground">
                {blogPosts[0].excerpt}
              </p>
                <p className="text-sm text-muted-foreground">
                  نویسنده: {blogPosts[0].author}
                </p>
            </div>
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(1).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-xl border bg-card"
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
                <div className="mb-3 flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="font-medium text-primary">
                    {post.category}
                  </span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="mb-2 line-clamp-2 font-semibold transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">
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

