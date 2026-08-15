"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
  fullHeight?: boolean;
  withContainer?: boolean;
  withPadding?: boolean;
}

export function ErrorMessage({
  message = "خطایی رخ داده است. لطفاً دوباره تلاش کنید.",
  onRetry,
  retryLabel = "تلاش مجدد",
  className,
  fullHeight = true,
  withContainer = false,
  withPadding = false,
}: ErrorMessageProps) {
  const content = (
    <div
      className={cn(
        "flex items-center justify-center",
        fullHeight && "min-h-[400px]",
        className
      )}
    >
      <div className="text-center">
        <p className="text-destructive mb-4">{message}</p>
        {onRetry && (
          <Button onClick={onRetry}>{retryLabel}</Button>
        )}
      </div>
    </div>
  );

  if (withContainer) {
    return (
      <div className={cn("py-8 lg:py-12", withPadding && "px-4")}>
        <div className="container-custom">
          {content}
        </div>
      </div>
    );
  }

  return content;
}

