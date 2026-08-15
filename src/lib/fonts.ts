import localFont from "next/font/local";

export const estedad = localFont({
  src: [
    {
      path: "../../public/assets/fonts/estedad/Estedad-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/estedad/Estedad-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/estedad/Estedad-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/estedad/Estedad-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/estedad/Estedad-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/estedad/Estedad-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/estedad/Estedad-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/estedad/Estedad-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/estedad/Estedad-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-estedad",
  display: "swap",
  fallback: ["Tahoma", "sans-serif"],
});

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
  fallback: ["Tahoma", "serif"],
});
