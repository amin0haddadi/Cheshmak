"use client";

import { cn } from "@/lib/utils";

export interface LoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  fullHeight?: boolean;
  withContainer?: boolean;
  withPadding?: boolean;
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
};

export function Loading({
  message,
  size = "md",
  className,
  fullHeight = true,
  withContainer = false,
  withPadding = false,
}: LoadingProps) {
  const content = (
    <div
      className={cn(
        "flex items-center justify-center",
        fullHeight && "min-h-[400px]",
        className
      )}
    >
      <div className="text-center">
        <div
          className={cn(
            "animate-spin rounded-full border-b-2 border-primary mx-auto mb-4",
            sizeClasses[size]
          )}
        />
        {message && (
          <p className="text-muted-foreground">{message}</p>
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

