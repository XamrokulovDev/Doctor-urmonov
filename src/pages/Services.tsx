import { useEffect, useState, Suspense, lazy } from 'react';
import axios from 'axios';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Elementary = lazy(() => import('../components/Elementary'));

interface CardItem {
  uuid: string;
  title_uz: string;
  title_ru: string;
  title_en: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
  image: string;
}

const Services = () => {
  const { i18n } = useTranslation();
  const _api = import.meta.env.VITE_API;

  const [card, setCard] = useState<CardItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${_api}/services/`);
        const data = response.data;
        if (Array.isArray(data)) {
          setCard(data);
          if (data.length > 0) setSelectedId(data[0].uuid);
        } else {
          setCard([]);
        }
      } catch (error) {
        console.error("Ma'lumotlarni olishda xatolik:", error);
      }
    };

    fetchServices();
  }, [_api]);

  useEffect(() => {
    if (selectedId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedId]);

  const getTitle = (item: CardItem) => {
    if (i18n.language === "uz") return item.title_uz;
    if (i18n.language === "ru") return item.title_ru;
    return item.title_en;
  };

  const getDescription = (item: CardItem) => {
    if (i18n.language === "uz") return item.description_uz;
    if (i18n.language === "ru") return item.description_ru;
    return item.description_en;
  };

  return (
    <Suspense fallback={<div className="fixed top-[50%] left-[50%] translate-x-[-50%]"></div>}>
      <div className="max-lg:px-4">
        <Elementary />
        <div className="max-w-7xl mx-auto flex items-start justify-start max-lg:flex-col gap-10 mb-52">
          <div className="w-[65%] max-lg:w-full bg-[#F5F8FF] rounded-[20px]">
            {card
              .filter((item) => item.uuid === selectedId)
              .map((item) => (
                <div key={item.uuid} className="p-4">
                  <LazyLoadImage
                    src={`https://urmonov.novacode.uz/${item.image}`}
                    loading="lazy"
                    alt={getTitle(item)}
                    className="w-full h-[450px] max-md:h-auto object-cover max-md:object-contain rounded-[10px]"
                  />
                  <h1
                    title={getTitle(item)}
                    className="text-[20px] sm:text-[22px] font-montserrat font-medium text-[#0A0933] leading-[140%] mt-7 my-3"
                  >
                    {getTitle(item)}
                  </h1>
                  <div
                    className="text-[#0A0933] text-[14px] sm:text-[16px] leading-[140%] font-normal font-montserrat mb-5 mt-1"
                    dangerouslySetInnerHTML={{ __html: getDescription(item) || "" }}
                  ></div>
                </div>
              ))}
          </div>
          <div className="w-[35%] max-lg:w-full grid grid-cols-1 gap-5 sticky top-10 self-start">
            {card.map((item) => (
              <div key={item.uuid} className="flex flex-col cursor-pointer gap-4">
                <div className="bg-[#F5F8FF] rounded-[10px] flex flex-col overflow-hidden">
                  <button
                    onClick={() => setSelectedId(item.uuid)}
                    className="w-full flex justify-between items-center px-5 py-3"
                  >
                    <div
                      className="w-[70%] text-[18px] leading-[140%] font-montserrat font-medium text-start"
                      dangerouslySetInnerHTML={{ __html: getTitle(item) || "" }}
                    ></div>
                    <span className="bg-white w-[30px] h-[30px] rounded-full flex justify-center items-center">
                      <MdKeyboardArrowRight
                        size={23}
                        className="text-[#0A6CFB] transition-transform duration-300"
                      />
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Services;