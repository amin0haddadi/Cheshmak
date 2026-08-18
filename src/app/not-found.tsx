import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <div className="relative mx-auto mb-8 size-64">
          <Image
            src="/assets/img/error-img.jpg"
            alt="Page not found"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
        <h2 className="mb-4 text-2xl font-semibold">Page Not Found</h2>
        <p className="mb-8 text-muted-foreground">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/shop">Browse Shop</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

