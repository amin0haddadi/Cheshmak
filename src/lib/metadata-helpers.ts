import type { Metadata } from "next";

interface GenerateMetadataParams {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  keywords?: string[];
}

/**
 * Helper function to generate comprehensive metadata for pages
 */
export function generatePageMetadata({
  title,
  description,
  image = "/assets/img/main-bg.jpg",
  url,
  type = "website",
  keywords = [],
}: GenerateMetadataParams): Metadata {
  // Use environment variable or default - update this with your actual domain
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://yourdomain.com");
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: "خانم خانما",
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "fa_IR",
      // OpenGraph only supports "website" or "article", so convert "product" to "website"
      type: (type === "product" ? "website" : type) as "website" | "article",
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [fullImageUrl],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}
