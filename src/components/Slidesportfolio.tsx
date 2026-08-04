import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Import images
import img1 from "../assets/slidesportofolio/1.webp";
import img2 from "../assets/slidesportofolio/2.webp";
import img3 from "../assets/slidesportofolio/3.webp";
import img4 from "../assets/slidesportofolio/4.webp";
import img5 from "../assets/slidesportofolio/5.webp";
import img6 from "../assets/slidesportofolio/6.webp";
import img7 from "../assets/slidesportofolio/7.webp";
import img8 from "../assets/slidesportofolio/8.webp";
import img9 from "../assets/slidesportofolio/9.webp";
import img10 from "../assets/slidesportofolio/10.webp";
import img11 from "../assets/slidesportofolio/11.webp";
import img12 from "../assets/slidesportofolio/12.webp";
import img13 from "../assets/slidesportofolio/13.webp";
import img14 from "../assets/slidesportofolio/14.webp";
import img15 from "../assets/slidesportofolio/15.webp";
import img16 from "../assets/slidesportofolio/16.webp";
import img17 from "../assets/slidesportofolio/17.webp";
import img18 from "../assets/slidesportofolio/18.webp";
import img19 from "../assets/slidesportofolio/19.webp";
import img20 from "../assets/slidesportofolio/20.webp";
import img21 from "../assets/slidesportofolio/21.webp";
import img22 from "../assets/slidesportofolio/22.webp";

const Slidesportfolio: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);

const imageData = [
    { id: 22, url: img22 },
    { id: 1, url: img1 },
    { id: 2, url: img2 },
    { id: 3, url: img3 },
    { id: 4, url: img4 },
    { id: 5, url: img5 },
    { id: 6, url: img6 },
    { id: 7, url: img7 },
    { id: 8, url: img8 },
    { id: 9, url: img9 },
    { id: 10, url: img10 },
    { id: 11, url: img11 },
    { id: 12, url: img12 },
    { id: 13, url: img13 },
    { id: 14, url: img14 },
    { id: 15, url: img15 },
    { id: 16, url: img16 },
    { id: 17, url: img17 },
    { id: 18, url: img18 },
    { id: 19, url: img19 },
    { id: 20, url: img20 },
    { id: 21, url: img21 },
    
];

  const handleSlideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!swiperRef.current) return;

    const slideWidth = event.currentTarget.offsetWidth;
    const clickX = event.nativeEvent.offsetX;

    if (clickX < slideWidth / 2) {
      swiperRef.current.swiper.slidePrev();
    } else {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handleBackClick = () => {
    window.history.back();
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const slide = event.currentTarget;
    const { width, height } = slide.getBoundingClientRect();
    const x = (event.nativeEvent.offsetX / width) * 2 - 1;
    const y = (event.nativeEvent.offsetY / height) * 2 - 1;
    slide.style.setProperty("--parallax-x", `${x * 10}px`);
    slide.style.setProperty("--parallax-y", `${y * 10}px`);
  };

  return (
    <div className="h-screen w-screen bg-gray overflow-hidden">
      <div className="relative w-full h-full">
        <div
          className="relative h-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Back Button */}
          <button
            onClick={handleBackClick}
            className="absolute top-4 left-4 z-50 bg-blue-400 text-white w-12 h-12 rounded-full shadow-md flex items-center justify-center hover:bg-blue-700 transition duration-300"
          >
            <i className="fas fa-arrow-left"></i>
          </button>

          <Swiper
            modules={[Pagination, Navigation, EffectFade]}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{
              clickable: true,
              type: "progressbar",
              progressbarFillClass: "swiper-pagination-progressbar-fill",
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            loop={true}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            className="w-full h-full"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {imageData.map((image) => (
              <SwiperSlide key={image.id} className="w-full h-full flex items-center justify-center bg-black">
                <div
                  className="w-full h-full relative overflow-hidden"
                  onClick={handleSlideClick}
                  onMouseMove={handleMouseMove}
                  style={{
                    transform: "perspective(1000px)",
                    "--parallax-x": "0px",
                    "--parallax-y": "0px",
                  } as React.CSSProperties}
                >
                  <img
                    src={image.url}
                    className="w-full h-full object-contain object-center cursor-pointer transform transition-transform duration-700"
                  />
                  {/* Vignette Effect */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div
            className={`swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-16 flex items-center justify-center shadow-xl transition-all duration-300 hover:w-20 hover:h-24 ${
              isHovered ? "translate-x-0" : "-translate-x-2"
            }`}
          >
          </div>
          <div
            className={`swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-16 flex items-center justify-center shadow-xl transition-all duration-300 hover:w-20 hover:h-24 ${
              isHovered ? "translate-x-0" : "translate-x-2"
            }`}
          >
          </div>
        </div>
      </div>

      {/* Custom CSS for Pagination and Fullscreen */}
      <style>{`
        html, body {
          overflow: hidden;
        }
        .swiper {
          width: 100%;
          height: 100%;
        }
        .swiper-slide {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .swiper-pagination-progressbar {
          height: 4px;
          top: 0 !important;
          width: 100%;
          left: 50% !important;
          transform: translateX(-50%);
        }
        .swiper-pagination-progressbar-fill {
          background: linear-gradient(to right, #ffffff, #d1d5db);
          transition: width 0.4s ease;
        }
        .swiper-slide > div {
          transform: translate3d(calc(var(--parallax-x) * -1), calc(var(--parallax-y) * -1), 0);
        }
      `}</style>
    </div>
  );
};

export default Slidesportfolio;








