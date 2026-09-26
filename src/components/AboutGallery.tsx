import Image from "next/image";
import about1 from "@/img/about-1.jpeg";
import about2 from "@/img/about-2.jpeg";
import about3 from "@/img/about-3.jpeg";
import Reveal from "./Reveal";

// Three overlapping photos — landscape, square, landscape — laid out like
// prints on a table: the outer two sit back and tilt slightly, the square sits
// in front. Photos brighten slightly on hover (see .photo-hover).
export default function AboutGallery() {
  return (
    <Reveal className="mt-16 sm:mt-20">
      <div aria-label="Photos of Toni" role="group" className="relative aspect-[5/2] w-full">
        <div className="photo-veil photo-hover absolute left-0 top-[10%] aspect-[3/2] w-[46%] -rotate-2 overflow-hidden rounded-xl shadow-md">
          <Image
            src={about1}
            alt="[ABOUT PHOTO 1 ALT TEXT]"
            fill
            sizes="(min-width: 680px) 313px, 46vw"
            placeholder="blur"
            className="object-cover"
          />
        </div>
        <div className="photo-veil photo-hover absolute right-0 top-[16%] aspect-[3/2] w-[46%] rotate-2 overflow-hidden rounded-xl shadow-md">
          <Image
            src={about3}
            alt="[ABOUT PHOTO 3 ALT TEXT]"
            fill
            sizes="(min-width: 680px) 313px, 46vw"
            placeholder="blur"
            className="object-cover"
          />
        </div>
        <div className="photo-veil photo-hover absolute left-1/2 top-0 z-10 aspect-square w-[36%] -translate-x-1/2 overflow-hidden rounded-xl shadow-lg ring-4 ring-background">
          <Image
            src={about2}
            alt="[ABOUT PHOTO 2 ALT TEXT]"
            fill
            sizes="(min-width: 680px) 245px, 36vw"
            placeholder="blur"
            className="object-cover"
          />
        </div>
      </div>
    </Reveal>
  );
}
