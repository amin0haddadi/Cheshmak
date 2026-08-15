import Image from "next/image";

const brands = [
  { name: "Brand 1", logo: "/assets/img/main-logo1.svg" },
  { name: "Brand 2", logo: "/assets/img/main-logo2.svg" },
  { name: "Brand 3", logo: "/assets/img/main-logo3.svg" },
  { name: "Brand 4", logo: "/assets/img/main-logo4.svg" },
  { name: "Brand 5", logo: "/assets/img/main-logo5.svg" },
];

export function BrandLogos() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container-custom">
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="opacity-50 hover:opacity-100 transition-opacity"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

