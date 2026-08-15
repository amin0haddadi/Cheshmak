import Image from "next/image";
import { Instagram } from "lucide-react";

const instagramImages = [
  "/assets/img/insta-photo1.jpg",
  "/assets/img/insta-photo2.jpg",
  "/assets/img/insta-photo3.jpg",
  "/assets/img/insta-photo4.jpg",
  "/assets/img/insta-photo5.jpg",
  "/assets/img/insta-photo6.jpg",
];

export function InstagramFeed() {
  return (
    <section>
      {/* Instagram Grid - Full width, no gaps, no rounded corners */}
      <div className="grid grid-cols-3 md:grid-cols-6">
        {instagramImages.map((image, index) => (
          <a
            key={index}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden"
          >
            <Image
              src={image}
              alt={`Instagram photo ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[#d05278]/0 group-hover:bg-[#d05278]/60 transition-colors flex items-center justify-center">
              <Instagram className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

