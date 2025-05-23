import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";

interface VideoItem {
  uuid: string;
  link: string;
  title_uz: string;
  title_ru: string;
  title_en: string;
}

const Videos: React.FC = () => {
  const { t, i18n } = useTranslation();
  const _api = import.meta.env.VITE_API;

  const [videos, setVideos] = useState<VideoItem[]>([]);

  useEffect(() => {
  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${_api}/social-videos/`);
      if (Array.isArray(res.data)) {
        setVideos(res.data);
      } else {
        setVideos([]);
      }
    } catch (err) {
      console.error("Ma'lumotlarni olishda xatolik:", err);
    }
  };

  fetchVideos();
}, []);

  const extractVideoId = (url?: string): string => {
    if (!url) return "";
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  const LiteYouTubeEmbed: React.FC<{ videoId: string; title: string }> = ({
    videoId,
    title,
  }) => {
    const [isPlayerActive, setIsPlayerActive] = useState(false);
    const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    return (
      <div
        className="relative w-full aspect-video bg-black rounded-[10px] overflow-hidden cursor-pointer"
        onClick={() => setIsPlayerActive(true)}
      >
        {isPlayerActive ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <>
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-transparent flex items-center justify-center"></div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <h1
        title={t("global_title.videos")}
        className="text-[#0A0933] text-[26px] md:text-[48px] font-semibold text-center mb-10"
      >
        {t("global_title.videos")}
      </h1>

      <div className="bg-[#181818] rounded-[10px] p-5">
        <Swiper
          style={{ width: "100%" }}
          slidesPerView={3}
          spaceBetween={20}
          loop={false}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          modules={[Autoplay]}
        >
          {videos.map((item) => {
            const videoId = extractVideoId(item.link);
            const title =
              i18n.language === "uz"
                ? item.title_uz
                : i18n.language === "ru"
                ? item.title_ru
                : item.title_en;

            return (
              <SwiperSlide
                key={item.uuid}
                className="bg-[#181818] rounded-[10px] overflow-hidden text-white shadow-lg"
              >
                <LiteYouTubeEmbed videoId={videoId} title={title} />
                <h1 className="font-semibold text-xl max-md:text-md mt-4 px-1 text-start text-white">
                  {title}
                </h1>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Videos;