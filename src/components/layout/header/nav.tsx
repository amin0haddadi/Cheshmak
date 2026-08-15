"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

interface NavProps {
  items: NavItem[];
  className?: string;
}

export function Nav({ items, className }: NavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center gap-8", className)}>
      {items.map((item) => {
        const isActive =
          pathname === item.path ||
          (item.children?.some((child) => pathname === child.path) ?? false);

        return (
          <div key={item.name} className="relative group">
            <Link
              href={item.path}
              className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors hover:text-[#d05278]",
                isActive ? "text-[#d05278]" : "text-[#222222]"
              )}
            >
              {item.name}
              {item.children && (
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              )}
            </Link>

            {/* Dropdown */}
            {item.children && (
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white shadow-lg py-4 min-w-[220px]">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.path}
                      className={cn(
                        "block px-10 py-2 text-base transition-colors hover:bg-[#d05278] hover:text-white",
                        pathname === child.path
                          ? "text-[#d05278] bg-[#d05278]/10"
                          : "text-[#666666]"
                      )}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}


