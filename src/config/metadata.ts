import type { Metadata } from "next";
import { brand } from "@/config/brand";

const rootMetadata: Metadata = {
  title: {
    template: `%s - ${brand.name}`,
    default: brand.name,
  },
  description: brand.description,

  authors: [
    {
      name: "Amin Haddadi",
    },
  ],
  keywords: [...brand.keywords],
};

export { rootMetadata };
