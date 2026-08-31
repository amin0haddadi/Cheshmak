import type { Metadata } from "next";
import { brand } from "@/config/brand";

const rootMetadata: Metadata = {
  title: {
    template: "40060969"
    // `%s - ${brand.name}`
    ,
    default:"40060969"
      //  brand.name
    ,
  },
  description: brand.description,

  authors: [
    {
      name: "Amin Haddadi",
    },
  ],
  keywords: [...brand.keywords],
  other: {
    enamad: "40060969",
  },
};

export { rootMetadata };
