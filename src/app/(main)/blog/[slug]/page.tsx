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
    title: "راهنمای کامل مراقبت از پوست برای مبتدیان",
    excerpt:
      "شروع یک روتین مراقبت از پوست می‌تواند دلهره‌آور باشد. این راهنمای ما برای ساختن یک روتین ساده و موثر است.",
    image: "/assets/img/blog-img1.jpg",
    author: "سارا محمدی",
    date: "۱۵ آذر ۱۴۰۳",
    category: "مراقبت پوست",
  },
  "makeup-trends-2024": {
    title: "برترین ترندهای آرایش در سال ۱۴۰۳",
    excerpt:
      "از پوست شیشه‌ای تا لب‌های جسورانه، ترندهای آرایشی که امسال زیبایی را تعریف می‌کنند را کشف کنید.",
    image: "/assets/img/blog-img2.jpg",
    author: "مریم احمدی",
    date: "۱۰ آذر ۱۴۰۳",
    category: "آرایش",
  },
  "natural-ingredients-guide": {
    title: "راهنمای مواد زیبایی طبیعی",
    excerpt:
      "درباره مواد طبیعی که می‌توانند روتین زیبایی شما را متحول کنند و دلیل کارآمدی آن‌ها بیاموزید.",
    image: "/assets/img/blog-img3.jpg",
    author: "علی رضایی",
    date: "۵ آذر ۱۴۰۳",
    category: "مواد تشکیل‌دهنده",
  },
  "hair-care-winter-tips": {
    title: "مراقبت از مو در زمستان",
    excerpt:
      "هوای سرد می‌تواند برای موهای شما سخت باشد. نکات برتر ما برای حفظ سلامت مو در طول زمستان.",
    image: "/assets/img/blog-img4.jpg",
    author: "لیلا کریمی",
    date: "۲۸ آبان ۱۴۰۳",
    category: "مراقبت مو",
  },
  "self-care-sunday-routine": {
    title: "روتین کامل مراقبت از خود در یکشنبه‌ها",
    excerpt:
      "یکشنبه‌های خود را با راهنمای گام به گام ما به یک آیین مراقبت از خود تبدیل کنید.",
    image: "/assets/img/blog-img5.jpg",
    author: "سارا محمدی",
    date: "۲۰ آبان ۱۴۰۳",
    category: "سلامت",
  },
  "fragrance-layering-tips": {
    title: "هنر لایه‌بندی عطر",
    excerpt:
      "کشف کنید چگونه با تسلط بر هنر لایه‌بندی عطر، عطر امضای خود را بسازید.",
    image: "/assets/img/blog-img6.jpg",
    author: "مریم احمدی",
    date: "۱۵ آبان ۱۴۰۳",
    category: "عطر",
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
    keywords: [post.category, "زیبایی", "مقالات"],
  });
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const defaultPost = {
    title: "The Ultimate Skincare Routine for Beginners",
    image: "/assets/img/post-img.jpg",
    date: "Dec 15, 2024",
    author: "Sarah Johnson",
    category: "Skincare",
    excerpt: "Starting a skincare routine can feel overwhelming.",
    content: `
      <p>Starting a skincare routine can feel overwhelming with so many products and steps to consider. But here's the good news: an effective skincare routine doesn't have to be complicated. In fact, a simple, consistent routine is often more beneficial than a complex one.</p>
      
      <h2>The Basics: Three Essential Steps</h2>
      
      <p>Every skincare routine should include these three fundamental steps:</p>
      
      <h3>1. Cleanse</h3>
      <p>Cleansing removes dirt, oil, and impurities from your skin. Choose a gentle cleanser that doesn't strip your skin of its natural oils. For most skin types, cleansing twice a day (morning and night) is ideal.</p>
      
      <h3>2. Moisturize</h3>
      <p>Regardless of your skin type, moisturizing is essential. It helps maintain your skin's barrier function and keeps it hydrated. Look for a moisturizer that suits your skin type – lighter for oily skin, richer for dry skin.</p>
      
      <h3>3. Protect</h3>
      <p>Sunscreen is the most important anti-aging product you can use. Apply a broad-spectrum SPF 30 or higher every morning, even on cloudy days.</p>
      
      <h2>Building Your Routine</h2>
      
      <p>Once you've mastered the basics, you can gradually add products to address specific concerns:</p>
      
      <ul>
        <li><strong>Serums:</strong> Targeted treatments for issues like dark spots, wrinkles, or dehydration</li>
        <li><strong>Toners:</strong> Help balance your skin's pH and prep it for other products</li>
        <li><strong>Eye cream:</strong> Addresses the delicate eye area</li>
        <li><strong>Exfoliants:</strong> Remove dead skin cells (use 1-2 times per week)</li>
      </ul>
      
      <h2>Tips for Success</h2>
      
      <p>Remember these key points as you build your routine:</p>
      
      <ul>
        <li>Introduce new products one at a time</li>
        <li>Give products at least 4-6 weeks to show results</li>
        <li>Listen to your skin – if something doesn't feel right, stop using it</li>
        <li>Consistency is more important than complexity</li>
      </ul>
      
      <p>Starting a skincare routine is a form of self-care that pays dividends over time. Be patient with yourself and your skin, and enjoy the journey to healthier, more radiant skin.</p>
    `,
  };

  const post = blogPosts[params.slug] || defaultPost;

  return (
    <div className="py-8 lg:py-12">
      <div className="container-custom">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Article */}
        <article className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <span className="text-primary font-medium">{post.category}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                <Image
                  src="/assets/img/comment-author1.jpg"
                  alt={post.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{post.author}</p>
                <p className="text-sm text-muted-foreground">Beauty Expert</p>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
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
              className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground">{post.excerpt}</p>
            </div>
          )}

          {/* Tags */}
          <div className="flex items-center gap-2 mt-8 pt-8 border-t">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <div className="flex gap-2">
              {["Skincare", "Beauty Tips", "Beginners"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-muted rounded-full text-sm"
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

