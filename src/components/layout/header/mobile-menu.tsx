"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Search, User, Heart, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui-store";
import { useCartStore } from "@/stores/cart-store";
import { useCart } from "@/hooks/queries/cart";
import { useWishlistStore } from "@/stores/wishlist-store";
import type { NavItem } from "@/types";

interface MobileMenuProps {
  items: NavItem[];
}

export function MobileMenu({ items }: MobileMenuProps) {
  const pathname = usePathname();
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();
  const { data: session } = useSession();
  const { data: apiCartItems } = useCart();
  const { items: localCartItems } = useCartStore();
  
  // Use API cart for authenticated users, local store for guests
  const cartItems = session?.user ? (apiCartItems || []) : localCartItems;
  const { items: wishlistItems } = useWishlistStore();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Close menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  return (
    <>
      {/* Backdrop - click to close */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-[100] lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Menu Panel - RTL: slides from left */}
      <div
        className={cn(
          "fixed top-0 h-full w-[230px] bg-white z-[101] lg:hidden transition-all duration-300 ease-in overflow-y-auto",
          isMobileMenuOpen ? "left-0" : "-left-[306px]"
        )}
        style={{ padding: "48px 30px 30px" }}
      >
        {/* Close Button */}
        <button
          onClick={closeMobileMenu}
          className="absolute top-4 left-4 text-[#222222] hover:text-[#d05278] transition-colors"
          aria-label="بستن منو"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Navigation */}
        <nav className="flex flex-col">
          {items.map((item) => {
            const isActive = pathname === item.path;

            return (
              <div key={item.name} className="mb-4">
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.name)}
                      className={cn(
                        "text-sm transition-colors hover:text-[#d05278] w-full text-right",
                        isActive ? "text-[#d05278]" : "text-[#222222]"
                      )}
                    >
                      {item.name}
                    </button>
                    {openSubmenu === item.name && (
                      <div className="flex flex-col mt-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.path}
                            className={cn(
                              "py-2 px-2.5 text-sm transition-colors hover:text-[#d05278]",
                              pathname === child.path
                                ? "text-[#d05278]"
                                : "text-[#666666]"
                            )}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.path}
                    className={cn(
                      "text-sm transition-colors hover:text-[#d05278]",
                      isActive ? "text-[#d05278]" : "text-[#222222]"
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* Header Options - Icons */}
        <div className="mt-5 pt-5 border-t border-black flex justify-between w-full">
          <Link href="/faq" className="text-[#222222] hover:text-[#d05278] transition-colors">
            <Search className="h-5 w-5" />
          </Link>
          <Link href="/profile" className="text-[#222222] hover:text-[#d05278] transition-colors">
            <User className="h-5 w-5" />
          </Link>
          <Link href="/wishlist" className="text-[#222222] hover:text-[#d05278] transition-colors">
            <Heart className="h-5 w-5" />
          </Link>
          <Link href="/cart" className="flex items-center text-[#222222] hover:text-[#d05278] transition-colors">
            <ShoppingBag className="h-5 w-5" />
            {cartItems.length > 0 && (
              <span className="mr-1 w-[22px] h-[22px] rounded-full bg-[#d05278] text-white text-xs font-bold flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </>
  );
}


