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
        return (
          <div key={item.name} className="group relative">
            <Link
              href={item.path}
              className="flex items-center gap-1 text-sm font-medium text-mark transition-colors hover:text-white"
            >
              {item.name}
              {item.children && (
                <ChevronDown className="size-4 transition-transform group-hover:rotate-180" />
              )}
            </Link>

            {/* Dropdown */}
            {item.children && (
              <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="min-w-[220px] bg-white py-4 shadow-lg">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.path}
                      className={cn(
                        "block px-10 py-2 text-base transition-colors hover:bg-primary hover:text-white",
                        pathname === child.path
                          ? "text-primary bg-primary/10"
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


