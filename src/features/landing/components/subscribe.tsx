"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Subscribe() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section className="relative overflow-hidden bg-muted/50 py-16 lg:py-24">
      {/* Decorative Image */}
      <div className="pointer-events-none absolute bottom-0 right-0 w-64 opacity-20 lg:w-96">
        <Image
          src="/assets/img/subscribe-img.png"
          alt=""
          width={400}
          height={400}
          className="object-contain"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-2 inline-block font-display text-lg text-primary">
            خبرنامه
          </span>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            عضویت و دریافت ۱۰٪ تخفیف
          </h2>
          <p className="mb-8 text-muted-foreground">
            برای دریافت آخرین اخبار، محصولات جدید و تخفیف‌های ویژه در خبرنامه ما
            عضو شوید.
          </p>

          <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row-reverse">
            <Input
              type="email"
              placeholder="ایمیل خود را وارد کنید"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 flex-1"
            />
            <Button type="submit" size="lg" className="h-12">
              {isSubmitted ? "عضو شدید!" : "عضویت"}
            </Button>
          </form>

          <p className="mt-4 text-xs text-muted-foreground">
            با عضویت، شما با سیاست حریم خصوصی ما موافقت کرده و رضایت می‌دهید
            که از چشمک به‌روزرسانی دریافت کنید.
          </p>
        </div>
      </div>
    </section>
  );
}

