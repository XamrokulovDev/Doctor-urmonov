import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import axios from "axios";
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
  date: string;
  hashtags: [string];
}

const Cards = () => {
  const { t, i18n } = useTranslation();
  const _api = import.meta.env.VITE_API;

  const [card, setCard] = useState<cardItem[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(`${_api}/news/`);
        if (Array.isArray(response.data)) {
          setCard(response.data);
        } else {
          setCard([]);
        }
      } catch (err) {
        console.error("Ma'lumotlarni olishda xatolik:", err);
      }
    };

    fetchCards();
  }, []);

  return (
    <div className="mb-52">
      <div className="max-w-7xl mx-auto grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 max-xl:grid-cols-2 gap-x-4 gap-y-12">
        {card?.map((item) => (
          <div
            key={item.uuid}
            className="bg-[#F4F5F8] rounded-[10px] flex flex-col items-center relative"
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
              className="rounded-t-[10px] w-full h-[280px] object-cover"
            />
            <div className="flex flex-col justify-center items-center mb-26">
              <h2
                title={
                  i18n.language === "uz"
                    ? item.title_uz
                    : i18n.language === "ru"
                    ? item.title_ru
                    : item.title_en
                }
                className="text-[20px] sm:text-[22px] text-[#1F2A42] font-semibold px-4 py-3"
              >
                {i18n.language === "uz"
                  ? item.title_uz
                  : i18n.language === "ru"
                  ? item.title_ru
                  : item.title_en}
              </h2>
              <div
                className="text-[14px] sm:text-[16px] text-[#1F2A42] px-4"
                dangerouslySetInnerHTML={{
                  __html:
                    i18n.language === "uz"
                      ? item?.description_uz.slice(0, 330)
                      : i18n.language === "ru"
                      ? item?.description_ru.slice(0, 330)
                      : item?.description_en.slice(0, 330),
                }}
              ></div>
              <div className="w-full absolute bottom-0 left-0 p-4">
                <NavLink
                  to={`/new/${item.uuid}`}
                  className="w-full flex justify-center rounded-[10px] bg-[#0A6CFB] text-white font-medium text-[16px] sm:text-[18px] lg:text-[20px] py-3 hover:bg-[#085cd6] transition-colors duration-200 mt-6"
                >
                  {t("global_title.button")}
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;