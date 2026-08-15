import localFont from "next/font/local";

/**
 * Nastaliq font configuration
 * 
 * Font files should be placed in: public/assets/fonts/nastaliq/
 * 
 * Download from: https://fonts.google.com/noto/specimen/Noto+Nastaliq+Urdu
 * Click "Download family" and extract the ZIP file
 * 
 * Required files (TTF format - easier to download):
 * - NotoNastaliqUrdu-Regular.ttf (weight: 400)
 * - NotoNastaliqUrdu-Medium.ttf (weight: 500)
 * - NotoNastaliqUrdu-SemiBold.ttf (weight: 600)
 * - NotoNastaliqUrdu-Bold.ttf (weight: 700)
 */
export const nastaliq = localFont({
  src: [
    {
      path: "../../public/assets/fonts/nastaliq/NotoNastaliqUrdu-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/nastaliq/NotoNastaliqUrdu-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/nastaliq/NotoNastaliqUrdu-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/nastaliq/NotoNastaliqUrdu-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-nastaliq",
  display: "swap",
  fallback: ["Tahoma", "sans-serif"],
});

