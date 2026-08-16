import Link from "next/link";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="breadcrumb"
      className={cn(
        "flex items-center justify-center gap-2 text-[14px] md:text-[16px]",
        className
      )}
    >
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="flex items-center gap-2">
          {index > 0 && <span className="text-mark">/</span>}
          {item.href ? (
            <Link
              href={item.href}
              className="text-mark hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-mark/60">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
