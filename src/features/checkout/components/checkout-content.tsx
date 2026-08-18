"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check, CreditCard, Truck, Package } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/stores/cart-store";

const steps = [
  { id: 1, name: "ارسال", icon: Truck },
  { id: 2, name: "پرداخت", icon: CreditCard },
  { id: 3, name: "بررسی", icon: Package },
];

export function CheckoutContent() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "ایران",
  });

  if (items.length === 0) {
    return (
      <div className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="mx-auto max-w-md text-center">
            <h2 className="mb-4 text-2xl font-bold">محصولی برای پرداخت وجود ندارد</h2>
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

  const subtotal = getTotal();
  const shipping = subtotal > 99 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Place order
      clearCart();
      router.push("/");
      alert("سفارش با موفقیت ثبت شد!");
    }
  };

  return (
    <div className="py-8 lg:py-12">
      <div className="container-custom">
        {/* Steps */}
        <div className="mb-12 flex items-center justify-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                  currentStep >= step.id
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-muted text-muted-foreground"
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
                  "ml-2 text-sm font-medium",
                  currentStep >= step.id
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {step.name}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-16 h-0.5 mx-4",
                    currentStep > step.id ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="rounded-xl border bg-card p-6">
                <h2 className="mb-6 text-xl font-semibold">
                  Shipping Information
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      First Name
                    </label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Last Name
                    </label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Phone
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium">
                      Address
                    </label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      City
                    </label>
                    <Input
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      State
                    </label>
                    <Input
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      ZIP Code
                    </label>
                    <Input
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Country
                    </label>
                    <Input
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="rounded-xl border bg-card p-6">
                <h2 className="mb-6 text-xl font-semibold">Payment Method</h2>
                <div className="space-y-4">
                  <div className="flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors hover:border-primary">
                    <input
                      type="radio"
                      name="payment"
                      defaultChecked
                      className="size-4"
                    />
                    <CreditCard className="size-6 text-muted-foreground" />
                    <span>Credit / Debit Card</span>
                  </div>
                  <div className="space-y-4 pl-8">
                    <Input placeholder="Card Number" />
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="MM/YY" />
                      <Input placeholder="CVC" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="rounded-xl border bg-card p-6">
                <h2 className="mb-6 text-xl font-semibold">Review Order</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 border-b pb-4 last:border-0"
                    >
                      <div className="relative size-16 overflow-hidden rounded-lg">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-medium">
                        {formatPrice(parseFloat(item.price) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t pt-6">
                  <h3 className="mb-2 font-semibold">Shipping Address</h3>
                  <p className="text-sm text-muted-foreground">
                    {formData.firstName} {formData.lastName}
                    <br />
                    {formData.address}
                    <br />
                    {formData.city}, {formData.state} {formData.zipCode}
                    <br />
                    {formData.country}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-6 flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={currentStep === 1}
              >
                Back
              </Button>
              <Button onClick={handleSubmit}>
                {currentStep === 3 ? "Place Order" : "Continue"}
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border bg-card p-6">
              <h2 className="mb-6 text-xl font-semibold">Order Summary</h2>

              <div className="mb-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal ({items.length} items)
                  </span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between border-t pt-4 text-lg font-semibold">
                  <span>Total</span>
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

