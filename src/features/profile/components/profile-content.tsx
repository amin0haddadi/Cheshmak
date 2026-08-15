"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { User, Package, Heart, LogOut, Settings, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLogout } from "@/hooks/mutations/auth";
import { Loading } from "@/components/ui/loading";

const orders = [
  {
    id: "ORD-001",
    date: "۱۵ آذر ۱۴۰۳",
    status: "delivered",
    total: 299.95,
    items: 3,
  },
  {
    id: "ORD-002",
    date: "۱۰ آذر ۱۴۰۳",
    status: "shipped",
    total: 149.99,
    items: 2,
  },
  {
    id: "ORD-003",
    date: "۵ آذر ۱۴۰۳",
    status: "processing",
    total: 89.95,
    items: 1,
  },
];

const statusLabels = {
  delivered: "تحویل شده",
  shipped: "ارسال شده",
  processing: "در حال پردازش",
  cancelled: "لغو شده",
};

export function ProfileContent() {
  const { logout } = useLogout();
  const { data: session, status } = useSession();

  // Get user from session
  const user = session?.user;

  // Split full name into first and last name
  const nameParts = useMemo(() => {
    if (!user?.name) return { firstName: "", lastName: "" };
    const parts = user.name.trim().split(/\s+/);
    if (parts.length === 1) {
      return { firstName: parts[0], lastName: "" };
    }
    const lastName = parts.pop() || "";
    const firstName = parts.join(" ");
    return { firstName, lastName };
  }, [user?.name]);

  const [profile, setProfile] = useState({
    firstName: nameParts.firstName,
    lastName: nameParts.lastName,
    email: user?.email || "",
    phone: "۰۹۱۲۱۲۳۴۵۶۷", // Phone not in API response yet
  });

  // Update profile when user data loads
  useEffect(() => {
    if (user) {
      setProfile({
        firstName: nameParts.firstName,
        lastName: nameParts.lastName,
        email: user.email,
        phone: "۰۹۱۲۱۲۳۴۵۶۷", // Phone not in API response yet
      });
    }
  }, [user, nameParts]);

  if (status === "loading") {
    return <Loading message="در حال بارگذاری پروفایل..." withContainer />;
  }

  if (status === "unauthenticated" || !user) {
    return (
      <div className="py-8 lg:py-12">
        <div className="container-custom">
          <p className="text-center text-muted-foreground">
            لطفاً ابتدا{" "}
            <Link href="/login" className="text-primary hover:underline">
              وارد حساب کاربری خود
            </Link>{" "}
            شوید.
          </p>
        </div>
      </div>
    );
  }

  const statusColors = {
    delivered: "bg-green-100 text-green-700",
    shipped: "bg-blue-100 text-blue-700",
    processing: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="py-8 lg:py-12">
      <div className="container-custom">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                  <User className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="font-semibold">
                  {user.name}
                </h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>

              <nav className="space-y-1">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted text-foreground"
                >
                  <User className="h-4 w-4" />
                  پروفایل
                </Link>
                <Link
                  href="/profile/orders"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <Package className="h-4 w-4" />
                  سفارش‌ها
                </Link>
                <Link
                  href="/wishlist"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <Heart className="h-4 w-4" />
                  علاقه‌مندی‌ها
                </Link>
                <Link
                  href="/profile/settings"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  تنظیمات
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors w-full"
                >
                  <LogOut className="h-4 w-4" />
                  خروج
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile">
              <TabsList className="mb-6">
                <TabsTrigger value="profile">پروفایل</TabsTrigger>
                <TabsTrigger value="orders">سفارش‌ها</TabsTrigger>
                <TabsTrigger value="addresses">آدرس‌ها</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <div className="bg-card rounded-xl border p-6">
                  <h2 className="text-xl font-semibold mb-6">
                    اطلاعات شخصی
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        نام
                      </label>
                      <Input
                        value={profile.firstName}
                        onChange={(e) =>
                          setProfile({ ...profile, firstName: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        نام خانوادگی
                      </label>
                      <Input
                        value={profile.lastName}
                        onChange={(e) =>
                          setProfile({ ...profile, lastName: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        ایمیل
                      </label>
                      <Input
                        type="email"
                        value={profile.email}
                        onChange={(e) =>
                          setProfile({ ...profile, email: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        تلفن
                      </label>
                      <Input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) =>
                          setProfile({ ...profile, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <Button className="mt-6">ذخیره تغییرات</Button>
                </div>
              </TabsContent>

              <TabsContent value="orders">
                <div className="bg-card rounded-xl border overflow-hidden">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">تاریخچه سفارش‌ها</h2>
                  </div>
                  <div className="divide-y">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.date} • {order.items} مورد
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span
                            className={cn(
                              "px-3 py-1 rounded-full text-xs font-medium capitalize",
                              statusColors[
                                order.status as keyof typeof statusColors
                              ]
                            )}
                          >
                            {statusLabels[order.status as keyof typeof statusLabels]}
                          </span>
                          <span className="font-semibold">
                            ${order.total.toFixed(2)}
                          </span>
                          <Button variant="outline" size="sm">
                            مشاهده
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="addresses">
                <div className="bg-card rounded-xl border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">آدرس‌های ذخیره شده</h2>
                    <Button>افزودن آدرس</Button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="font-medium">منزل</span>
                        </div>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          پیش‌فرض
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        تهران، خیابان ولیعصر، پلاک ۱۲۳
                        <br />
                        کد پستی: ۱۲۳۴۵۶۷۸۹۰
                        <br />
                        ایران
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">دفتر</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        تهران، خیابان انقلاب، پلاک ۴۵۶
                        <br />
                        کد پستی: ۹۸۷۶۵۴۳۲۱۰
                        <br />
                        ایران
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

