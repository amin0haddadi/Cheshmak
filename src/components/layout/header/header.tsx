"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { X, Search, User, Heart, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { useCart } from "@/hooks/queries/cart";
import { useUIStore } from "@/stores/ui-store";
import { mainNavItems } from "@/data/navigation";
import { Nav } from "./nav";
import { MobileMenu } from "./mobile-menu";
import { BrandLogo } from "@/components/layout/brand-logo";
import { brand } from "@/config/brand";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();
  const { data: apiCartItems } = useCart();
  const { items: localCartItems } = useCartStore();
  
  // Use API cart for authenticated users, local store for guests
  const cartItems = session?.user ? (apiCartItems || []) : localCartItems;
  const { isPromoVisible, hidePromo, isMobileMenuOpen, toggleMobileMenu } =
    useUIStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="absolute right-0 top-0 z-[101] w-full">
        {/* Promo Banner */}
        {isPromoVisible && (
          <div className="absolute right-0 top-0 w-full bg-[#222222] px-4 py-3 text-center text-sm text-white">
            <span className="font-bold opacity-80">
              ۳۰٪ تخفیف روی همه محصولات - کد تخفیف: {brand.promoCode}
            </span>
            <button
              onClick={hidePromo}
              className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
              aria-label="Close promo"
            >
              <X className="size-4" />
            </button>
          </div>
        )}

        {/* Main Header - Overlays hero */}
        <div
          className={cn(
            "transition-all duration-300 px-[15px] md:px-[40px] lg:px-[70px]",
            isPromoVisible ? "pt-[55px] md:pt-10" : "pt-4 md:pt-1",
            isScrolled && "fixed top-0 left-0 right-0 shadow-md bg-primary/80 !py-1"
          )}
        >
          <div className="w-full">
            <div className="flex items-center justify-between text-mark">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <BrandLogo className="aspect-[1087/535] h-12 md:h-[68px]" />
              </Link>

              {/* Desktop Navigation */}
              <Nav items={mainNavItems} className="hidden lg:flex" />

              {/* Header Actions - Hidden on mobile, shown in mobile menu instead */}
              <div className="hidden items-center gap-11 lg:flex">
                <Link href="/faq" className="transition-colors hover:text-white">
                  <Search className="size-5" />
                </Link>

                <Link href="/profile" className="transition-colors hover:text-white">
                  <User className="size-5" />
                </Link>

                <Link href="/wishlist" className="transition-colors hover:text-white">
                  <Heart className="size-5" />
                </Link>

                <Link href="/cart" className="flex items-center transition-colors hover:text-white">
                  <ShoppingBag className="size-5" />
                  {cartItems.length > 0 && (
                    <span className="ml-1 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-mark text-xs font-bold text-primary">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </div>

              {/* Mobile Menu Toggle - Only visible on mobile */}
              <button
                className="flex h-[45px] w-[22px] flex-col items-center justify-center lg:hidden"
                onClick={toggleMobileMenu}
              >
                <span className={cn(
                  "block w-[22px] h-[2px] bg-mark transition-transform origin-center",
                  isMobileMenuOpen ? "translate-y-[1px] rotate-45" : ""
                )} />
                <span className={cn(
                  "block w-[22px] h-[2px] bg-mark my-[5px] transition-opacity",
                  isMobileMenuOpen ? "opacity-0" : ""
                )} />
                <span className={cn(
                  "block w-[22px] h-[2px] bg-mark transition-transform origin-center",
                  isMobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                )} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu items={mainNavItems} />
    </>
  );
}


