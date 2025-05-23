import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import DOMPurify from 'dompurify';
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
  popular: boolean;
}

const HomeCards = () => {
  const { t, i18n } = useTranslation();
  const _api = import.meta.env.VITE_API;
  const [card, setCard] = useState<cardItem[]>([]);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPopularServices = async () => {
      try {
        const res = await axios.get(`${_api}/services/popular/`);
        if (Array.isArray(res.data)) {
          setCard(res.data.filter((item: cardItem) => item.popular));
        } else {
          setCard([]);
        }
      } catch (error) {
        setCard([]);
        console.error("Axios bilan malumot olishda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    getPopularServices();
  }, []);

  const handleImageLoad = (uuid: string) => {
    setLoadedImages((prev) => ({ ...prev, [uuid]: true }));
  };

  const skeletonArray = new Array(6).fill(0);

  return (
    <div className='max-w-7xl mx-auto max-xl:px-4 my-20'>
      <h1
        title={t('global_title.cards')}
        className='text-[#1F2A42] max-md:text-[28px] text-[48px] font-poppins font-bold leading-[140%] text-center'
      >
        {t('global_title.cards')}
      </h1>

      {loading ? (
        <div className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 max-xl:grid-cols-2 mt-16 gap-4">
          {skeletonArray.map((_, i) => (
            <div
              key={i}
              className="bg-gray-300 rounded-[20px] h-[350px] animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 max-xl:grid-cols-2 mt-16 gap-4">
          {card.map((item) => {
            const rawHTML =
              i18n.language === "uz"
                ? item.description_uz
                : i18n.language === "ru"
                ? item.description_ru
                : item.description_en;
            const cleanText = DOMPurify.sanitize(rawHTML, { ALLOWED_TAGS: [] });
            const shortText =
              cleanText.length > 370 ? cleanText.slice(0, 370) + '...' : cleanText;
            const imageSrc = `https://urmonov.novacode.uz/${item.image}`;
            const isLoaded = loadedImages[item.uuid];

            return (
              <NavLink 
                to={"/services"}
                key={item.uuid}
                className='group bg-[#F5F8FF] hover:bg-[#0A0933] hover:text-white text-[#0A0933] rounded-[20px] overflow-hidden transition-all duration-300 relative p-4 pb-20 min-h-[350px]'
              >
                <div className="relative w-full h-[250px]">
                  <LazyLoadImage
                    src={imageSrc}
                    alt={
                      i18n.language === "uz"
                        ? item.title_uz
                        : i18n.language === "ru"
                        ? item.title_ru
                        : item.title_en
                    }
                    width={400}
                    height={250}
                    loading="lazy"
                    onLoad={() => handleImageLoad(item.uuid)}
                    className={`w-full h-[250px] object-cover rounded-[15px] transition-all duration-300 ${
                      isLoaded ? 'blur-0' : 'blur-sm'
                    }`}
                    style={{ display: 'block' }}
                  />
                </div>
                <div>
                  <h1
                    title={
                      i18n.language === "uz"
                        ? item.title_uz
                        : i18n.language === "ru"
                        ? item.title_ru
                        : item.title_en
                    }
                    className='text-[20px] font-semibold leading-[140%] font-montserrat py-4'
                  >
                    {i18n.language === "uz"
                      ? item.title_uz
                      : i18n.language === "ru"
                      ? item.title_ru
                      : item.title_en}
                  </h1>
                  <p
                    className='w-[95%] text-[16px] font-montserrat leading-[140%] line-clamp-9 gap-1'
                    style={{ minHeight: '10.8em' }} 
                  >
                    {shortText}
                  </p>
                </div>
                <div className="w-[165px] h-[95px] bg-white rounded-[21px] absolute bottom-[-25px] right-[-25px] transition-all duration-300">
                  <div className="w-[35px] h-[35px] absolute bottom-[25px] right-[165px] bg-[#F5F8FF] border border-[#F5F8FF] card-shadow transition-all duration-300 group-hover:bg-[#0A0933] group-hover:border-[#0A0933]"></div>
                  <div className="w-[35px] h-[35px] absolute bottom-[95px] right-[25px] bg-[#F5F8FF] border border-[#F5F8FF] card-shadow transition-all duration-300 group-hover:bg-[#0A0933] group-hover:border-[#0A0933]"></div>
                  <NavLink
                    to={`/services`}
                    className='flex items-center justify-center w-[125px] h-[55px] ml-3 mt-3 rounded-[10px] text-[20px] font-normal transition-all duration-300 bg-[#0A6CFB] text-white'
                  >
                    {t('global_title.button')}
                  </NavLink>
                </div>
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomeCards;