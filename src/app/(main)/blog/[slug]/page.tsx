import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata-helpers";

interface BlogPostPageProps {
  params: { slug: string };
}

// Mock blog posts data - in real app, fetch from API/database
const blogPosts: Record<
  string,
  {
    title: string;
    excerpt: string;
    image: string;
    author: string;
    date: string;
    category: string;
    content?: string;
  }
> = {
  "skincare-routine-for-beginners": {
    title: "راهنمای انتخاب فریم مناسب فرم صورت",
    excerpt:
      "شکل صورت نقش مهمی در انتخاب فریم دارد. در این راهنما مدل مناسب صورت گرد، کشیده و مربعی را بررسی می‌کنیم.",
    image: "/assets/img/blog-img1.jpg",
    author: "سارا محمدی",
    date: "۱۵ آذر ۱۴۰۳",
    category: "انتخاب فریم",
  },
  "makeup-trends-2024": {
    title: "ترندهای عینک در سال ۱۴۰۳",
    excerpt:
      "از فریم‌های شفاف تا مدل‌های گربه‌ای، ترندهای امسال عینک را بشناسید و سبک خود را پیدا کنید.",
    image: "/assets/img/blog-img2.jpg",
    author: "مریم احمدی",
    date: "۱۰ آذر ۱۴۰۳",
    category: "ترند",
  },
  "natural-ingredients-guide": {
    title: "راهنمای نگهداری از عینک",
    excerpt:
      "با چند عادت ساده، فریم و عدسی‌ها را تمیز و سالم نگه دارید و عمر عینک را بیشتر کنید.",
    image: "/assets/img/blog-img3.jpg",
    author: "علی رضایی",
    date: "۵ آذر ۱۴۰۳",
    category: "نگهداری",
  },
  "hair-care-winter-tips": {
    title: "چطور عینک آفتابی مناسب انتخاب کنیم",
    excerpt:
      "محافظت UV، رنگ عدسی و شکل فریم؛ نکاتی که قبل از خرید عینک آفتابی باید بدانید.",
    image: "/assets/img/blog-img4.jpg",
    author: "لیلا کریمی",
    date: "۲۸ آبان ۱۴۰۳",
    category: "عینک آفتابی",
  },
  "self-care-sunday-routine": {
    title: "تفاوت عینک طبی و عینک آفتابی",
    excerpt:
      "اگر بین مدل طبی و آفتابی مردد هستید، این مقایسه کوتاه کمک می‌کند انتخاب بهتری داشته باشید.",
    image: "/assets/img/blog-img5.jpg",
    author: "سارا محمدی",
    date: "۲۰ آبان ۱۴۰۳",
    category: "راهنما",
  },
  "fragrance-layering-tips": {
    title: "راهنمای انتخاب عدسی عینک",
    excerpt:
      "عدسی ضد بازتاب، بلوکات و فتوکرومیک چه تفاوتی دارند و کدام برای استفاده روزمره مناسب‌تر است.",
    image: "/assets/img/blog-img6.jpg",
    author: "مریم احمدی",
    date: "۱۵ آبان ۱۴۰۳",
    category: "عدسی",
  },
};

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts[params.slug];

  if (!post) {
    return generatePageMetadata({
      title: "مقاله یافت نشد",
      description: "مقاله مورد نظر یافت نشد.",
      url: `/blog/${params.slug}`,
    });
  }

  return generatePageMetadata({
    title: post.title,
    description: post.excerpt,
    image: post.image,
    url: `/blog/${params.slug}`,
    type: "article",
    keywords: [post.category, "عینک", "مقالات"],
  });
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const defaultPost = {
    title: "راهنمای انتخاب فریم مناسب فرم صورت",
    image: "/assets/img/post-img.jpg",
    date: "۱۵ آذر ۱۴۰۳",
    author: "سارا محمدی",
    category: "انتخاب فریم",
    excerpt: "شکل صورت نقش مهمی در انتخاب فریم دارد.",
    content: `
      <p>انتخاب فریم مناسب فقط به سلیقه بستگی ندارد؛ فرم صورت، رنگ پوست و سبک روزمره هم مهم است. خبر خوب این است که با چند قاعده ساده می‌توانید مدل مناسب را سریع‌تر پیدا کنید.</p>
      
      <h2>سه نکته اصلی</h2>
      
      <p>قبل از خرید این سه مورد را در نظر بگیرید:</p>
      
      <h3>۱. فرم صورت</h3>
      <p>برای صورت گرد فریم‌های زاویه‌دار، برای صورت کشیده مدل‌های پهن‌تر و برای صورت مربعی فریم‌های گردتر معمولاً تعادل بهتری می‌سازند.</p>
      
      <h3>۲. راحتی روی بینی و گوش</h3>
      <p>فریم نباید روی بینی فشار بیاورد یا از گوش سر بخورد. پد بینی و دسته را در صفحه محصول بررسی کنید.</p>
      
      <h3>۳. کاربرد</h3>
      <p>عینک کار روزانه، رانندگی یا استفاده آفتابی هرکدام عدسی و فریم متفاوتی می‌طلبند.</p>
      
      <h2>قدم بعدی</h2>
      
      <p>اگر هنوز مطمئن نیستید، دسته‌بندی‌های فروشگاه چشمک را ببینید یا با پشتیبانی مشورت کنید.</p>
    `,
  };

  const post = blogPosts[params.slug] || defaultPost;

  return (
    <div className="py-8 lg:py-12">
      <div className="container-custom">
        {/* Back Link */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Blog
        </Link>

        {/* Article */}
        <article className="mx-auto max-w-3xl">
          {/* Header */}
          <header className="mb-8">
            <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="font-medium text-primary">{post.category}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
            <h1 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative size-12 overflow-hidden rounded-full bg-muted">
                <Image
                  src="/assets/img/comment-author1.jpg"
                  alt={post.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{post.author}</p>
                <p className="text-sm text-muted-foreground">مشاور عینک</p>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative mb-8 aspect-video overflow-hidden rounded-xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          {post.content ? (
            <div
              className="prose prose-lg prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground">{post.excerpt}</p>
            </div>
          )}

          {/* Tags */}
          <div className="mt-8 flex items-center gap-2 border-t pt-8">
            <Tag className="size-4 text-muted-foreground" />
            <div className="flex gap-2">
              {["عینک", "انتخاب فریم", "راهنما"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-3 py-1 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

