import { brand } from "@/config/brand";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <span
      role="img"
      aria-label={brand.name}
      className={cn("inline-block shrink-0 bg-metal", className)}
      style={{
        WebkitMaskImage: `url(${brand.logo})`,
        maskImage: `url(${brand.logo})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
