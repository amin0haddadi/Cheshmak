"use client";

import { useEffect, useState } from "react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

const DEFAULT_TOAST_DURATION = 5000;

function ToastProgress({ 
  duration, 
  isOpen, 
  variant 
}: { 
  duration: number; 
  isOpen: boolean;
  variant?: "default" | "destructive" | "success";
}) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isOpen || duration <= 0) {
      setProgress(100);
      return;
    }

    setProgress(100);
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 16); // ~60fps updates for smooth animation

    return () => clearInterval(interval);
  }, [duration, isOpen]);

  if (duration <= 0) return null;

  const progressColor = 
    variant === "destructive" 
      ? "bg-destructive-foreground" 
      : variant === "success"
      ? "bg-green-600"
      : "bg-primary";

  return (
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-background/20 overflow-hidden rounded-b-md">
      <div
        className={`h-full ${progressColor} transition-all ease-linear`}
        style={{
          width: `${progress}%`,
          transitionDuration: "16ms",
        }}
      />
    </div>
  );
}

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, duration, open, variant, ...props }) {
        const toastDuration = duration ?? DEFAULT_TOAST_DURATION;
        return (
          <Toast key={id} {...props} open={open} variant={variant}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
            <ToastProgress 
              duration={toastDuration} 
              isOpen={open ?? true} 
              variant={variant}
            />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

