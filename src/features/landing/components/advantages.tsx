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
    <section className="py-12 border-y">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center"
            >
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

