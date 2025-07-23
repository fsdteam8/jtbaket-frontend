"use client";

import Image from "next/image";

interface BannerSectionProps {
    title?: string;
    description?: string;
    image: string;
}

export default function BannerSection({ title, description, image }: BannerSectionProps) {
    return (
        <section className="relative h-[400px] w-full overflow-hidden">
            <Image
                src={image}
                alt="Banner Background"
                fill
                className="object-cover "
                priority
            />
            <div className="absolute inset-0 bg-black/30" /> {/* optional dark overlay for contrast */}
            <div className="relative container z-10 h-full flex items-center px-10">
                <div className="text-white max-w-xl flex flex-col gap-7">
                    <h1 className="text-2xl md:text-5xl font-semibold">{title}</h1>
                    <p className="mt-2 text-sm md:text-2xl leading-relaxed">{description}</p>
                </div>
            </div>
        </section>
    );
}
