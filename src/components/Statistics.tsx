import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface imgTypes {
  image: string;
} 

interface statisTypes {
  uuid: string;
  value: string;
  title_uz: string;
  title_ru: string;
  title_en: string;
}

const Statistics = () => {
  const { t, i18n } = useTranslation();
  const [image, setImage] = useState<imgTypes | null>(null);
  const [statis, setStatis] = useState<statisTypes[] | null>(null);
  const _api = import.meta.env.VITE_API;

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get(`${_api}/about-us/`);
        setImage(res.data);
      } catch (err) {
        console.error("Ma'lumotlarni olishda xatolik:", err);
      }
    };

    fetchAbout();
  }, []);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const res = await axios.get(`${_api}/statistics/`);
        setStatis(res.data);
      } catch (err) {
        console.error("Ma'lumotlarni olishda xatolik:", err);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div className="max-w-7xl mx-auto md:px-6 xl:px-0">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full h-full flex justify-center">
          <LazyLoadImage 
            src={`https://urmonov.novacode.uz/${image?.image}`}
            loading="lazy"
            alt={t('about_page.general_title')}
            className="w-full max-w-[600px] rounded-3xl object-contain"
          />
        </div>
        <div className="w-full grid grid-cols-2 max-sm:grid-cols-1 gap-6">
          {
            statis?.map((item) =>(
              <div key={item.uuid} className="bg-[#F5F8FF] flex flex-col items-center justify-center rounded-[20px] text-center py-22 p-6">
                <h1 
                  title={item.value} 
                  className="text-[#0A6CFB] text-[80px] font-montserrat font-bold"
                >
                  {item.value}
                </h1>
                <p className="text-[#454745] text-[32px] font-montserrat font-semibold">
                  {
                    i18n.language === "uz"
                    ? item.title_uz
                    : i18n.language === "ru"
                    ? item.title_ru
                    : item.title_en
                  }
                </p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Statistics;