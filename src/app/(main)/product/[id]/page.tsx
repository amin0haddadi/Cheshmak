import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/metadata-helpers";
import { getProductById } from "@/lib/api/products";
import { ProductDetails } from "@/features/products/components/product-details";

interface ProductPageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductById(params.id);

  if (!product) {
    return generatePageMetadata({
      title: "محصول یافت نشد",
      description: "محصول مورد نظر یافت نشد.",
      url: `/product/${params.id}`,
    });
  }

  const averageRating =
    product.reviews && product.reviews.length > 0
      ? product.reviews.reduce((acc, r) => acc + r.rating, 0) /
        product.reviews.length
      : 0;

  return generatePageMetadata({
    title: product.name,
    description: product.content || product.description || product.name,
    image: product.image,
    url: `/product/${product.id}`,
    type: "product",
    keywords: [
      product.name,
      product.category,
      "خرید آنلاین",
      "محصولات زیبایی",
      ...(product.filterItems || []),
    ],
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}

