import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { footerNavItems, paymentMethods, socialLinks } from "@/data/navigation";
import { brand } from "@/config/brand";
import { BrandLogo } from "@/components/layout/brand-logo";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const socialIcons = {
  instagram: InstagramIcon,
  telegram: TelegramIcon,
  whatsapp: WhatsAppIcon,
} as const;

export function Footer() {
  return (
    <footer className="bg-background/60 text-white backdrop-blur-sm">
      {/* Top Section */}
      <div className="container-custom py-12">
        <div className="flex flex-col items-center justify-between gap-8 border-b border-white/10 pb-12 md:flex-row">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/70">ما را دنبال کنید:</span>
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => {
                const Icon =
                  socialIcons[link.icon as keyof typeof socialIcons];
                if (!Icon) return null;

                return (
                  <a
                    key={link.name}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="flex size-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-metal hover:text-primary hover:shadow-metal"
                  >
                    <Icon className="size-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <BrandLogo className="aspect-[1087/535] h-[72px] md:h-20" />
          </Link>

          {/* Payment Methods */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/70">روش‌های پرداخت:</span>
            <div className="flex items-center gap-2">
              {paymentMethods.map((method) => {
                const logo = (
                  <Image
                    src={method.icon}
                    alt={method.name}
                    width={48}
                    height={48}
                    className="h-10 w-auto opacity-90 transition-opacity hover:opacity-100"
                  />
                );

                if ("href" in method && method.href) {
                  return (
                    <a
                      key={method.name}
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={method.name}
                    >
                      {logo}
                    </a>
                  );
                }

                return <div key={method.name}>{logo}</div>;
              })}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          {footerNavItems.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-lg font-semibold">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className="text-sm text-white/70 transition-colors hover:text-mark"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">تماس با ما</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 flex-shrink-0 text-primary" />
                <a
                  href={`https://www.google.com/maps?q=${brand.location.lat},${brand.location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 transition-colors hover:text-mark"
                >
                  {brand.address}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-5 flex-shrink-0 text-primary" />
                <a
                  href={`tel:${brand.phoneTel}`}
                  className="text-sm text-white/70 transition-colors hover:text-mark"
                >
                  {brand.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-5 flex-shrink-0 text-primary" />
                <a
                  href={`mailto:${brand.email}`}
                  className="text-sm text-white/70 transition-colors hover:text-mark"
                >
                  {brand.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <p className="text-center text-sm text-white/50">
            © کلیه حقوق محفوظ است. {brand.name} {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}


