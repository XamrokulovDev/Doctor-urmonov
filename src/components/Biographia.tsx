import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import BioImg from "./BioImg";

interface bioTypes {
  title_uz: string;
  title_ru: string;
  title_en: string;
  image: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
  experience: string;
}

const Biographia = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isAboutPage = location.pathname === "/about";
  const [bioData, setBioData] = useState<bioTypes | null>(null);
  const [bio, setBio] = useState<bioTypes | null>(null);
  const _api = import.meta.env.VITE_API;

  useEffect(() => {
    axios.get(`${_api}/about-us/`)
      .then(response => {
        setBioData(response.data);
      })
      .catch(err => {
        console.error("ma'lumotlarni olishda xatolik:", err);
      });
  }, []);

  useEffect(() => {
    axios.get(`${_api}/biography/`)
      .then(response => {
        setBio(response.data);
      })
      .catch(err => {
        console.error("ma'lumotlarni olishda xatolik:", err);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto flex max-lg:flex-col items-center justify-between gap-10 my-20 max-lg:px-4 max-xl:px-4">
      <BioImg />
      <div className="w-full lg:w-[45%] flex flex-col items-start gap-5">
        {isAboutPage ? (
          <>
            <h1 
              title={t('bio.title')} 
              className="text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px] leading-[140%] font-montserrat font-semibold text-[#0A0933]"
            >
              {t('bio.title')}
            </h1>
            <div
              className="text-[16px] sm:text-[18px] md:text-[20px] font-medium font-montserrat leading-[140%] text-[#454745]"
              dangerouslySetInnerHTML={{
                __html:
                  i18n.language === "uz"
                    ? bioData?.description_uz || ""
                    : i18n.language === "ru"
                    ? bioData?.description_ru || ""
                    : bioData?.description_en || ""
              }}
            ></div>
          </>
        ) : (
          <>
            <h1 
              title={
                i18n.language === "uz"
                  ? bio?.title_uz
                  : i18n.language === "ru"
                  ? bio?.title_ru
                  : bio?.title_en
              }
              className="text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px] leading-[140%] font-montserrat font-semibold text-[#0A0933]"
            >
              {
                i18n.language === "uz"
                  ? bio?.title_uz
                  : i18n.language === "ru"
                  ? bio?.title_ru
                  : bio?.title_en
              }
            </h1>
            <div
              className="text-[18px] sm:text-[20px] md:text-[22px] font-medium font-montserrat leading-[140%] text-[#454745]"
              dangerouslySetInnerHTML={{
                __html:
                  i18n.language === "uz"
                    ? bio?.description_uz || ""
                    : i18n.language === "ru"
                    ? bio?.description_ru || ""
                    : bio?.description_en || ""
              }}
            ></div>
            <NavLink 
              to='/about' 
              className="bg-[#0A6CFB33] text-[#0A6CFB] font-poppins font-semibold text-[18px] sm:text-[20px] rounded-[5px] px-8 sm:px-10 py-2.5 sm:py-3 transition-all duration-300 hover:bg-[#0A6CFB55]"
            >
              {t('bio.button')}
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Biographia;