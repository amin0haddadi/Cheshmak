import { Truck, RefreshCw, HeadphonesIcon, ShieldCheck } from "lucide-react";

const advantages = [
  {
    icon: Truck,
    title: "ارسال رایگان",
    description: "برای سفارش‌های بالای ۹۹ هزار تومان",
  },
  {
    icon: RefreshCw,
    title: "بازگشت آسان",
    description: "۳۰ روز ضمانت بازگشت",
  },
  {
    icon: HeadphonesIcon,
    title: "پشتیبانی ۲۴/۷",
    description: "همیشه در کنار شما هستیم",
  },
  {
    icon: ShieldCheck,
    title: "پرداخت امن",
    description: "پرداخت ۱۰۰٪ امن",
  },
];

export function Advantages() {
  return (
    <section className="border-y py-12">
      <div className="container-custom">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {advantages.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10">
                <item.icon className="size-6 text-primary" />
              </div>
              <h3 className="mb-1 font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

