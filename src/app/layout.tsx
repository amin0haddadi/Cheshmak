import { rootMetadata } from "@/config/metadata";
import { QueryProvider } from "@/lib/providers/query-provider";
import { SessionProvider } from "@/lib/providers/session-provider";
import { Toaster } from "@/components/ui/toaster";
import { estedad } from "@/lib/fonts";
import "./globals.css";

export const metadata = rootMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`dark ${estedad.variable}`}
    >
      <body className={`${estedad.className} flex min-h-screen flex-col`}>
        <SessionProvider>
          <QueryProvider>
            {children}
            <Toaster />
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
