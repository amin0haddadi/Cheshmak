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
    <section className="relative py-16 lg:py-24 bg-muted/50 overflow-hidden">
      {/* Decorative Image */}
      <div className="absolute right-0 bottom-0 w-64 lg:w-96 opacity-20 pointer-events-none">
        <Image
          src="/assets/img/subscribe-img.png"
          alt=""
          width={400}
          height={400}
          className="object-contain"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-primary font-display text-lg mb-2">
            خبرنامه
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            عضویت و دریافت ۱۰٪ تخفیف
          </h2>
          <p className="text-muted-foreground mb-8">
            برای دریافت آخرین اخبار، محصولات جدید و تخفیف‌های ویژه در خبرنامه ما
            عضو شوید.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row-reverse gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="ایمیل خود را وارد کنید"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-12"
            />
            <Button type="submit" size="lg" className="h-12">
              {isSubmitted ? "عضو شدید!" : "عضویت"}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">
            با عضویت، شما با سیاست حریم خصوصی ما موافقت کرده و رضایت می‌دهید
            که از خانم خانما به‌روزرسانی دریافت کنید.
          </p>
        </div>
      </div>
    </section>
  );
}

