import Image from "next/image";
import { cn } from "@/lib/utils";
import { Breadcrumb, type BreadcrumbItem } from "@/components/ui/breadcrumb";

interface PageHeaderProps {
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export function PageHeader({ title, breadcrumbs }: PageHeaderProps) {
  return (
    <div
      className={cn(
        "relative pb-[60px] md:pb-[80px] text-center z-[1]",
        title ? "md:pt-[218px] pt-[130px]" : "md:pt-[140px] pt-[100px]"
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-[1]">
        {/* Mobile background */}
        <Image
          src="/assets/img/mobile-detail-bg.jpg"
          alt=""
          fill
          className="object-cover object-center md:hidden"
        />
        {/* Desktop background */}
        <Image
          src="/assets/img/detail-bg.jpg"
          alt=""
          fill
          className="object-cover object-center hidden md:block"
        />
      </div>

      {/* Content */}
      <div className="container-custom text-center flex flex-col justify-center items-center gap-10">
        {title && (
          <h1 className="text-[45px] md:text-[60px] font-bold text-mark leading-tight text-center">
            {title}
          </h1>
        )}

        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb items={breadcrumbs} />
        )}
      </div>
    </div>
  );
}
