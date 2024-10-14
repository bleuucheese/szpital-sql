import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import linksData from "@/statics/dashboard.links.json";
export default function Home() {
  return (
    <main className="rounded-lg bg-[#D4EAF6] flex flex-1 justify-center space-x-5 p-5">
      <section className="grid grid-cols-2 desktop:grid-cols-3 gap-5">
        {linksData.map((link, index) => (
          <Link
            href={link.href}
            key={index}
            className="rounded-md overflow-hidden size-fit"
          >
            <Image
              src={link.image}
              alt={link.alt}
              width={350}
              height={272}
              className="w-[350px] h-[272px]"
            />
            <div className="p-5 bg-[#4C4372] line-clamp-1 text-white font-semibold">
              {link.label}
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
