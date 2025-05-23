import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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

const BlogCards = () => {
  const { i18n } = useTranslation();
  const _api = import.meta.env.VITE_API;
  const [card, setCard] = useState<cardItem[]>([]);

  useEffect(() => {
    axios.get(`${_api}/blogs/`)
      .then(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          setCard(data);
        } else {
          setCard([]);
        }
      })
      .catch(err => {
        console.error("Ma'lumotlarni olishda xatolik:", err);
      });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className='max-w-7xl mx-auto mb-26'>
      <div className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 gap-y-6 gap-x-4">
        {
          card?.map((item) => (
            <NavLink to={`/blog/${item.uuid}`} key={item.uuid}>
              <div className='h-[434px] rounded-[10px] overflow-hidden relative group duration-300 ease-in-out cursor-pointer'>
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
                  className='w-full h-[500px] max-md:h-[450px] object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out'
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
                    className='text-white text-[24px] font-[600] text-start'
                  >
                    {
                      i18n.language === "uz"
                        ? item.title_uz.slice(0,50)
                        : i18n.language === "ru"
                        ? item.title_ru.slice(0,50)
                        : item.title_en.slice(0,50)
                    }
                  </h1>
                </div>
              </div>
            </NavLink>
          ))
        }
      </div>
    </div>
  );
};

export default BlogCards;