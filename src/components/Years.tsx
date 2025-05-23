import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";

interface dataTypes {
  id: string;  
  title_uz: string;
  title_ru: string;
  title_en: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
}

const Years = () => {
  const _api = import.meta.env.VITE_API;
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<dataTypes[]>([]);

  useEffect(() => {
    axios
      .get(`${_api}/our-mission/`)
      .then((response) => {
        const resData = response.data;
        setData(Array.isArray(resData) ? resData : [resData]);
      })
      .catch((err) => {
        console.error("Ma'lumotlarni olishda xatolik:", err);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0 py-20 relative">
      <div className="flex items-center justify-center mb-28">
        <h1
          title={t('about_page.general_title')}
          className="text-[#1F2A42] text-[32px] md:text-[48px] font-semibold text-center leading-[140%] lg:w-[50%]"
        >
          {t('about_page.general_title')}
        </h1>
      </div>
      <div className="relative mb-32">
        <div className="absolute top-10 left-1/2 max-md:left-0 transform -translate-x-1/2 h-[98.2%] w-1 bg-blue-500 z-0"></div>
        {data.map((item, idx) => {
          const isLeft = idx % 2 === 0;
          const yearFontSize = (typeof item.id === 'string' && item.id.length < 6) ? 'text-[36px]' : 'text-[22px] my-3';
          return (
            <div key={item.id} className="relative flex flex-col md:flex-row items-center justify-between">
              {isLeft && (
                <div className="w-full md:w-5/10 flex justify-end md:pr-1 max-md:ml-2 z-10">
                  <div className="rounded-lg w-full">
                    <h2 className={`text-[#0A6CFB] font-semibold font-poppins text-end max-md:text-start max-md:ml-5 pr-5 rounded-2xl ${yearFontSize}`}>
                      {
                        i18n.language === "uz"
                        ? item.title_uz
                        : i18n.language === "ru"
                        ? item.title_ru
                        : item.title_en
                      }
                    </h2>
                    <div
                      className="bg-[#F5F8FF] font-montserrat text-[#000000] leading-[140%] font-medium text-[24px] max-md:text-[18px] text-end max-md:text-start text-base whitespace-pre-line rounded-[10px] pl-16 max-md:pl-5 px-5 py-2"
                      dangerouslySetInnerHTML={{
                        __html:
                          i18n.language === "uz"
                            ? item.description_uz || ""
                            : i18n.language === "ru"
                            ? item.description_ru || ""
                            : item.description_en || ""
                      }}
                    ></div>
                  </div>
                </div>
              )}
              <div className="absolute top-3 left-1/2 max-md:left-0 transform -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full z-20"></div>
              {!isLeft && <div className="w-full md:w-5/12"></div>}
              {!isLeft && (
                <div className="w-full md:w-5/10 flex justify-start md:pl-1 max-md:ml-2 z-10">
                  <div className="rounded-lg w-full">
                    <h2
                      title={
                        i18n.language === "uz"
                        ? item.title_uz
                        : i18n.language === "ru"
                        ? item.title_ru
                        : item.title_en
                      }
                      className={`text-[#0A6CFB] font-semibold font-poppins text-start pl-5 ${yearFontSize}`}>
                      {
                        i18n.language === "uz"
                        ? item.title_uz
                        : i18n.language === "ru"
                        ? item.title_ru
                        : item.title_en
                      }
                    </h2>
                    <div
                      className="bg-[#F5F8FF] font-montserrat text-[#000000] leading-[140%] font-medium text-[24px] max-md:text-[18px] text-end max-md:text-start text-base whitespace-pre-line pl-16 max-md:pl-5 px-5 py-2"
                      dangerouslySetInnerHTML={{
                        __html:
                          i18n.language === "uz"
                            ? item.description_uz || ""
                            : i18n.language === "ru"
                            ? item.description_ru || ""
                            : item.description_en || ""
                      }}
                    ></div>
                  </div>
                </div>
              )}
              {isLeft && <div className="w-full md:w-5/12"></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Years;