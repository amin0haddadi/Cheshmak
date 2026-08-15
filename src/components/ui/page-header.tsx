import Image from "next/image";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
}

export function PageHeader({ title, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="relative pt-[130px] pb-[60px] md:pt-[218px] md:pb-[80px] text-center z-[1]">
      {/* Background Image */}
      <div className="absolute inset-0 -z-[1]">
        {/* Mobile background */}
        <Image
          src="/assets/img/detail-main-bg-sm.jpg"
          alt=""
          fill
          className="object-cover object-center md:hidden"
        />
        {/* Desktop background */}
        <Image
          src="/assets/img/detail-main-bg.jpg"
          alt=""
          fill
          className="object-cover object-center hidden md:block"
        />
      </div>

      {/* Content */}
      <div className="container-custom text-center flex flex-col justify-center items-center gap-10">
        <h1 className="text-[45px] md:text-[60px] font-bold text-[#222222] leading-tight text-center">
          {title}
        </h1>

        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center justify-center gap-2 text-[14px] md:text-[16px]">
            {breadcrumbs.map((item, index) => (
              <span key={index} className="flex items-center gap-2">
                {index > 0 && <span className="text-[#666666]">/</span>}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-[#666666] hover:text-[#d05278] transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-[#d05278]">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}

