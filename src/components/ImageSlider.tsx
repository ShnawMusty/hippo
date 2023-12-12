"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper/modules";
import type SwiperType from "swiper";
import "swiper/css";
import "swiper/css/pagination";

interface ImageSliderProps {
  urls: string[]
}

const ImageSlider = ({ urls }: ImageSliderProps) => {
  const [swiperjs, setSwiper] = useState<null | SwiperType>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === (urls.length ?? 0) - 1,
  });

  useEffect(() => {
    swiperjs?.on("slideChange", ({ activeIndex }) => {
      setActiveIndex(activeIndex);
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (urls.length ?? 0) - 1,
      });
    });
  }, [swiperjs, urls]);

  const activeStyles =
    "active:scale-[0.97] opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square rounded-full h-6 w-6 z-50 flex items-center justify-center bg-white border-2 border-zinc-600";

  const inactiveStyles = "hidden text-gray-400";

  return (
    <div className="relative group bg-zinc-100 aspect-square overflow-hidden rounded-xl">
      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={(e) => {
            e.preventDefault();
            swiperjs?.slideNext();
          }}
          aria-label="next image"
          className={cn("right-3 transition", activeStyles, {
            [inactiveStyles]: slideConfig.isEnd,
            "hover:bg-primary-300 text-primary-800 opacity-100":
              !slideConfig.isEnd,
          })}
        >
          <ChevronRight className="w-4 h-4 text-zinc-700" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            swiperjs?.slidePrev();
          }}
          aria-label="previous image"
          className={cn("left-3 transition", activeStyles, {
            [inactiveStyles]: slideConfig.isBeginning,
            "hover:bg-primary-300 text-primary-800 opacity-100":
              !slideConfig.isBeginning,
          })}
        >
          <ChevronLeft className="w-4 h-4 text-zinc-700" />
        </button>
      </div>

      <Swiper
        modules={[Pagination]}
        pagination={{
          renderBullet: (_, className) => {
            return `<span class="rounded-full transition ${className}"></span>`;
          },
        }}
        onSwiper={(swiper) => setSwiper(swiper)}
        spaceBetween={50}
        slidesPerView={1}
        className="w-full h-full"
      >
          {urls.map((url, i) => (
            <SwiperSlide key={i} className="-z-10 relative w-full h-full">

              <Image src={url} alt="Product image" fill loading="eager" className="object-cover object-center" />

            </SwiperSlide>   
          ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
