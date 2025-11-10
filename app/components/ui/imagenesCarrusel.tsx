'use client';
import { Swiper,SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";


export function ImagenesCarrusel({imagenesCarrusel}:{imagenesCarrusel:string[]}) {

    return (
        <div>
        <Swiper
          modules={[Autoplay, Pagination]}
          loop={true}
          pagination={{ 
            clickable: true, 
            dynamicBullets: true
          }}
          autoplay={{ 
            delay: 3500,
            disableOnInteraction: false 
          }}
          breakpoints={{
            865: {
              slidesPerView: 2,
            },
            320: { 
              slidesPerView: 1,
            }
          }}
        >
          {imagenesCarrusel.map((imagen, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <div className="relative w-[98%] h-[400px] mx-auto rounded-xl overflow-hidden border-2 border-white lg:h-[550px]">
              <Image
                src={imagen}
                alt={`Banner ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
          ))}
        </Swiper>
        </div>
    )
}