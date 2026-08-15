"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/hooks/mutations/auth";
import { useToast } from "@/hooks/use-toast";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export function RegisterContent() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const { mutateAsync: register, isPending } = useRegister();

  const {
    register: registerField,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // Register the user
      const response = await register({
        name: `${data.firstName} ${data.lastName}`.trim(),
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      });

      // Log response for debugging
      console.log("Register response:", response);
      console.log("Response type:", typeof response);
      console.log("Response keys:", response ? Object.keys(response) : "null");

      // Response structure: { user: {...}, token: "..." }
      // No data wrapper - access user and token directly
      // Check if response has user and token properties directly
      const user = response?.user;
      const token = response?.token;

      if (user && token) {
        const signInResult = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        if (signInResult?.error) {
          toast({
            title: "ثبت نام موفق",
            description: "حساب کاربری شما ایجاد شد. لطفاً وارد شوید.",
          });
          router.push("/login");
        } else if (signInResult?.ok) {
          toast({
            title: "ثبت نام موفق",
            description: `خوش آمدید ${user.name}`,
          });
          router.push("/");
          router.refresh();
        }
      } else {
        // Log what we actually got
        console.error("Unexpected response structure:", response);
        // Fallback if response structure is unexpected
        toast({
          title: "ثبت نام موفق",
          description: "حساب کاربری شما ایجاد شد. لطفاً وارد شوید.",
        });
        router.push("/login");
      }
    } catch (error: any) {
      // Log error for debugging
      console.error("Register error:", error);
      
      // Handle different error structures
      let errorMessage = "خطا در ثبت نام. لطفاً اطلاعات خود را بررسی کنید.";
      
      if (error) {
        // Check for validation errors (422 status) - Laravel format
        if (error.data?.errors) {
          const errors = error.data.errors;
          // Get first error from first field
          const firstField = Object.keys(errors)[0];
          if (firstField && Array.isArray(errors[firstField]) && errors[firstField].length > 0) {
            errorMessage = errors[firstField][0];
          }
        }
        // Check for error message in data
        else if (error.data?.message) {
          errorMessage = error.data.message;
        }
        // Check for error field
        else if (error.data?.error) {
          errorMessage = error.data.error;
        }
        // Check for direct message (from ApiError)
        else if (error.message) {
          errorMessage = error.message;
        }
      }

      toast({
        title: "خطا در ثبت نام",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">ایجاد حساب کاربری</h1>
        <p className="text-muted-foreground">
          به خانم خانما بپیوندید برای پیشنهادهای ویژه و به‌روزرسانی‌ها
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="block mb-3">
              نام
            </Label>
            <Input
              id="firstName"
              placeholder="نام خود را وارد کنید"
              {...registerField("firstName", {
                required: "نام الزامی است",
                minLength: {
                  value: 2,
                  message: "نام باید حداقل ۲ کاراکتر باشد",
                },
              })}
              className={errors.firstName ? "border-destructive" : ""}
            />
            {errors.firstName && (
              <p className="text-sm text-destructive mt-2">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="lastName" className="block mb-3">
              نام خانوادگی
            </Label>
            <Input
              id="lastName"
              placeholder="نام خانوادگی خود را وارد کنید"
              {...registerField("lastName", {
                required: "نام خانوادگی الزامی است",
                minLength: {
                  value: 2,
                  message: "نام خانوادگی باید حداقل ۲ کاراکتر باشد",
                },
              })}
              className={errors.lastName ? "border-destructive" : ""}
            />
            {errors.lastName && (
              <p className="text-sm text-destructive mt-2">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="email" className="block mb-3">
            ایمیل
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...registerField("email", {
              required: "ایمیل الزامی است",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "ایمیل معتبر نیست",
              },
            })}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-2">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="password" className="block mb-3">
            رمز عبور
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...registerField("password", {
                required: "رمز عبور الزامی است",
                minLength: {
                  value: 8,
                  message: "رمز عبور باید حداقل 8 کاراکتر باشد",
                },
                validate: {
                  hasUppercase: (value) =>
                    /[A-Z]/.test(value) ||
                    "رمز عبور باید حداقل یک حرف بزرگ داشته باشد",
                  hasSpecialChar: (value) =>
                    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value) ||
                    "رمز عبور باید حداقل یک کاراکتر خاص داشته باشد",
                  hasNumber: (value) =>
                    /[0-9]/.test(value) ||
                    "رمز عبور باید حداقل یک عدد داشته باشد",
                },
              })}
              className={errors.password ? "border-destructive" : ""}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-destructive mt-2">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="password_confirmation" className="block mb-3">
            تکرار رمز عبور
          </Label>
          <div className="relative">
            <Input
              id="password_confirmation"
              type={showPasswordConfirmation ? "text" : "password"}
              placeholder="••••••••"
              {...registerField("password_confirmation", {
                required: "تکرار رمز عبور الزامی است",
                validate: (value) =>
                  value === password || "رمز عبور و تکرار آن باید یکسان باشند",
              })}
              className={errors.password_confirmation ? "border-destructive" : ""}
            />
            <button
              type="button"
              onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPasswordConfirmation ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password_confirmation && (
            <p className="text-sm text-destructive mt-2">
              {errors.password_confirmation.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={isPending}>
          {isPending ? "در حال ثبت نام..." : "ایجاد حساب کاربری"}
        </Button>
      </form>

      <p className="text-center text-xs text-muted-foreground mt-6">
        با ایجاد حساب کاربری، شما با{" "}
        <Link href="/terms" className="text-primary hover:underline">
          شرایط استفاده
        </Link>{" "}
        و{" "}
        <Link href="/privacy" className="text-primary hover:underline">
          حریم خصوصی
        </Link>{" "}
        ما موافقت می‌کنید
      </p>

      <p className="text-center text-sm text-muted-foreground mt-8">
        قبلاً حساب کاربری دارید؟{" "}
        <Link href="/login" className="text-primary hover:underline">
          ورود
        </Link>
      </p>
    </>
  );
}

