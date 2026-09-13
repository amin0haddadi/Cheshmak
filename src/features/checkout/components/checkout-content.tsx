'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Check, Truck, Package } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loading } from '@/components/ui/loading';
import { useCart } from '@/hooks/queries/cart';
import { useAddresses } from '@/hooks/queries/addresses';
import { useCreateAddress } from '@/hooks/mutations/addresses';
import { useCreateOrder } from '@/hooks/mutations/orders';
import { checkoutCities } from '@/data/cities';
import { useToast } from '@/hooks/use-toast';
import type { CartItem } from '@/types';

const steps = [
  { id: 1, name: 'آدرس', icon: Truck },
  { id: 2, name: 'بررسی و پرداخت', icon: Package },
];

export function CheckoutContent() {
  const { data: session, status } = useSession();
  const { data: apiCartItems, isLoading: cartLoading } = useCart();

  const { data: addresses = [], isLoading: addressesLoading } = useAddresses();
  const { mutateAsync: createAddress, isPending: creatingAddress } =
    useCreateAddress();
  const { mutateAsync: placeOrder, isPending: placingOrder } = useCreateOrder();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [formData, setFormData] = useState({
    title: 'منزل',
    first_name: '',
    last_name: '',
    phone: '',
    address_line_1: '',
    postal_code: '',
    city_id: checkoutCities[0]?.id ?? 1,
  });

  const isAuthenticated = status === 'authenticated' && !!session?.user;
  const items: CartItem[] = apiCartItems || [];

  const subtotal = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0,
  );

  const shipping = subtotal >= 1_000_000 ? 0 : 0;
  const total = subtotal + shipping;

  const activeAddressId = useMemo(() => {
    if (selectedAddressId) return selectedAddressId;
    const defaultAddress =
      addresses.find((a) => a.is_default) || addresses[0] || null;
    return defaultAddress?.id ?? null;
  }, [addresses, selectedAddressId]);

  if (status === 'loading' || (isAuthenticated && cartLoading)) {
    return <Loading message="در حال بارگذاری تسویه حساب..." withContainer />;
  }

  if (!isAuthenticated) {
    return (
      <div className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="mx-auto max-w-md text-center">
            <h2 className="mb-4 text-2xl font-bold">برای پرداخت وارد شوید</h2>
            <p className="mb-8 text-muted-foreground">
              ثبت سفارش و اتصال به درگاه پرداخت فقط برای کاربران واردشده ممکن
              است.
            </p>
            <Button asChild size="lg">
              <Link href="/login?callbackUrl=/checkout">ورود / ثبت‌نام</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="mx-auto max-w-md text-center">
            <h2 className="mb-4 text-2xl font-bold">
              محصولی برای پرداخت وجود ندارد
            </h2>
            <p className="mb-8 text-muted-foreground">
              ابتدا چند محصول به سبد خرید خود اضافه کنید.
            </p>
            <Button asChild size="lg">
              <Link href="/shop">ادامه خرید</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'city_id' ? Number(value) : value,
    }));
  };

  const ensureAddressId = async (): Promise<number> => {
    if (!showNewAddress && activeAddressId) {
      return activeAddressId;
    }

    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.phone ||
      !formData.address_line_1 ||
      !formData.postal_code
    ) {
      throw new Error('لطفاً همه فیلدهای آدرس را کامل کنید.');
    }

    const created = await createAddress({
      title: formData.title || 'منزل',
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: formData.phone,
      address_line_1: formData.address_line_1,
      city_id: formData.city_id,
      postal_code: formData.postal_code,
      is_default: addresses.length === 0,
    });

    setSelectedAddressId(created.id);
    setShowNewAddress(false);
    return created.id;
  };

  const handleContinue = async () => {
    try {
      if (currentStep === 1) {
        if (addresses.length === 0 || showNewAddress) {
          await ensureAddressId();
        } else if (!activeAddressId) {
          throw new Error('لطفاً یک آدرس انتخاب کنید.');
        }
        setCurrentStep(2);
        return;
      }

      const addressId = await ensureAddressId();
      await placeOrder({ address_id: addressId });
    } catch (error: any) {
      if (error?.message && !error?.status) {
        toast({
          title: 'خطا',
          description: error.message,
          variant: 'destructive',
        });
      }
    }
  };

  const isBusy = creatingAddress || placingOrder || addressesLoading;

  return (
    <div className="py-8 lg:py-12">
      <div className="container-custom">
        <div className="mb-12 flex items-center justify-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  'flex size-10 items-center justify-center rounded-full border-2 transition-colors',
                  currentStep >= step.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted text-muted-foreground',
                )}
              >
                {currentStep > step.id ? (
                  <Check className="size-5" />
                ) : (
                  <step.icon className="size-5" />
                )}
              </div>
              <span
                className={cn(
                  'mr-2 text-sm font-medium',
                  currentStep >= step.id
                    ? 'text-foreground'
                    : 'text-muted-foreground',
                )}
              >
                {step.name}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'mx-4 h-0.5 w-16',
                    currentStep > step.id ? 'bg-primary' : 'bg-muted',
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="rounded-xl border bg-card p-6">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold">آدرس ارسال</h2>
                  {addresses.length > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowNewAddress((v) => !v)}
                    >
                      {showNewAddress ? 'انتخاب آدرس قبلی' : 'آدرس جدید'}
                    </Button>
                  )}
                </div>

                {!showNewAddress && addresses.length > 0 ? (
                  <div className="space-y-3">
                    {addresses.map((address) => (
                      <label
                        key={address.id}
                        className={cn(
                          'flex cursor-pointer gap-3 rounded-lg border p-4 transition-colors',
                          activeAddressId === address.id
                            ? 'border-primary bg-primary/5'
                            : 'hover:border-primary/50',
                        )}
                      >
                        <input
                          type="radio"
                          name="address"
                          className="mt-1 size-4"
                          checked={activeAddressId === address.id}
                          onChange={() => setSelectedAddressId(address.id)}
                        />
                        <div className="text-sm">
                          <p className="font-medium">
                            {address.title || 'آدرس'}
                            {address.is_default ? ' (پیش‌فرض)' : ''}
                          </p>
                          <p className="mt-1 text-muted-foreground">
                            {[address.first_name, address.last_name]
                              .filter(Boolean)
                              .join(' ')}
                            {address.phone ? ` — ${address.phone}` : ''}
                          </p>
                          <p className="mt-1 text-muted-foreground">
                            {address.city?.name
                              ? `${address.city.name}، `
                              : ''}
                            {address.address_line_1}
                            {address.postal_code
                              ? ` — کد پستی ${address.postal_code}`
                              : ''}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        عنوان
                      </label>
                      <Input
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        شهر
                      </label>
                      <select
                        name="city_id"
                        value={formData.city_id}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        {checkoutCities.map((city) => (
                          <option key={city.id} value={city.id}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        نام
                      </label>
                      <Input
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        نام خانوادگی
                      </label>
                      <Input
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        تلفن
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        کد پستی
                      </label>
                      <Input
                        name="postal_code"
                        value={formData.postal_code}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-medium">
                        آدرس کامل
                      </label>
                      <Input
                        name="address_line_1"
                        value={formData.address_line_1}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 2 && (
              <div className="rounded-xl border bg-card p-6">
                <h2 className="mb-6 text-xl font-semibold">بررسی سفارش</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.variantId ?? 'v'}`}
                      className="flex items-center gap-4 border-b pb-4 last:border-0"
                    >
                      <div className="relative size-16 overflow-hidden rounded-lg">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          تعداد: {item.quantity}
                        </p>
                      </div>
                      <span className="font-medium">
                        {formatPrice(parseFloat(item.price) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-muted-foreground">
                  با تأیید، به درگاه پرداخت منتقل می‌شوید.
                </p>
              </div>
            )}

            <div className="mt-6 flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(1)}
                disabled={currentStep === 1 || isBusy}
              >
                بازگشت
              </Button>
              <Button onClick={handleContinue} disabled={isBusy}>
                {isBusy
                  ? 'لطفاً صبر کنید...'
                  : currentStep === 2
                    ? 'پرداخت'
                    : 'ادامه'}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border bg-card p-6">
              <h2 className="mb-6 text-xl font-semibold">خلاصه سفارش</h2>
              <div className="mb-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    جمع ({items.length} مورد)
                  </span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ارسال</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">رایگان</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-4 text-lg font-semibold">
                  <span>مبلغ قابل پرداخت</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
