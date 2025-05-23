import React, { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Elementary = React.lazy(() => import('../components/Elementary'));

interface cardItem {
  uuid: string;
  title_uz: string;
  title_ru: string;
  title_en: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
  image: string;
}

const BlogDetails = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const _api = import.meta.env.VITE_API;
  const [blog, setBlog] = useState<cardItem | null>(null);
  const [card, setCard] = useState<cardItem[]>([]);

  useEffect(() => {
    axios.get(`${_api}/blog/${id}`)
      .then(response => {
        setBlog(response.data);
      })
      .catch(err => {
        console.error("Ma'lumotlarni olishda xatolik:", err);
      });
  }, [id, _api]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [blog]);

  useEffect(() => {
    axios.get(`${_api}/blogs/`)
      .then(response => {
        if (Array.isArray(response.data)) {
          setCard(response.data);
        } else {
          setCard([]);
        }
      })
      .catch(err => {
        console.error("Ma'lumotlarni olishda xatolik:", err);
      });
  }, [_api]);

  return (
    <div className='max-lg:px-4'>
      <Suspense fallback={<div className="fixed top-[50%] left-[50%] translate-x-[-50%]">Loading...</div>}>
        <Elementary />
      </Suspense>
      <div className='max-w-7xl mx-auto max-lg:px-4 bg-[#F5F8FF] rounded-[30px] text-[#0A0933] font-montserrat mb-24 px-8 py-6'>
        <h1 
          title={
            i18n.language === "uz"
            ? blog?.title_uz
            : i18n.language === "ru"
            ? blog?.title_ru
            : blog?.title_en
          }  
          className='lg:w-[100%] text-start text-[32px] max-md:text-[21px] text-[#0A0933] font-semibold mb-7 my-4'
        >
          {
            i18n.language === "uz"
            ? blog?.title_uz
            : i18n.language === "ru"
            ? blog?.title_ru
            : blog?.title_en
          }
        </h1>
        <LazyLoadImage 
          src={`https://urmonov.novacode.uz/${blog?.image}`} 
          loading="lazy"
          alt={
            i18n.language === "uz"
            ? blog?.title_uz
            : i18n.language === "ru"
            ? blog?.title_ru
            : blog?.title_en
          } 
          className='w-full h-[500px] max-md:h-auto object-cover max-md:object-contain rounded-md mb-6' 
        />
        <div
          className="text-[20px] max-md:text-[17px] leading-[140%]"
          dangerouslySetInnerHTML={{
            __html:
              i18n.language === "uz"
                ? blog?.description_uz || ""
                : i18n.language === "ru"
                ? blog?.description_ru || ""
                : blog?.description_en || ""
          }}
        ></div>
      </div>
      <div className="max-w-7xl mx-auto">
        <h1 className='text-[#0A0933] text-[32px] max-md:text-[26px] font-semibold text-start mb-10'>{t('global_title.swiper')}</h1>
        <Swiper
          style={{ width: "100%" }}
          slidesPerView={1}
          spaceBetween={20}
          loop={false}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          modules={[Autoplay]}
          className="mySwiper h-[380px] mb-28"
        >
          {card.map((item) => (
            <SwiperSlide 
              key={item.uuid} 
              onClick={() => {
                setBlog(item);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className='h-[500px] rounded-[8px] overflow-hidden cursor-pointer'
            >
              <LazyLoadImage 
                src={`https://urmonov.novacode.uz/${item.image}`}
                loading="lazy"
                alt={
                  i18n.language === "uz"
                    ? item.title_uz
                    : i18n.language === "ru"
                    ? item.title_ru
                    : item.title_en
                }
                className='w-full h-full object-cover hover:scale-110 transition-all duration-300'
              />
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-500 to-transparent z-10" />
              <div className="w-full absolute bottom-0 left-0 px-4 py-2 z-20">
                <h1 
                  title={
                    i18n.language === "uz"
                      ? item.title_uz
                      : i18n.language === "ru"
                      ? item.title_ru
                      : item.title_en
                  }
                  className='text-white text-[20px] font-[600] text-start'
                >
                  {
                    (i18n.language === "uz"
                      ? item.title_uz
                      : i18n.language === "ru"
                      ? item.title_ru
                      : item.title_en).slice(0, 45)
                  }
                </h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BlogDetails;