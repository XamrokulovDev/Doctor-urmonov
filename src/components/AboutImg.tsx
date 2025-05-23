import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface dataTypes {
  image: string;
  title_uz: string;
  title_ru: string;
  title_en: string;
  subtitle_uz: string;
  subtitle_ru: string;
  subtitle_en: string;
}

const AboutImg = () => {
  const _api = import.meta.env.VITE_API;
  const { i18n } = useTranslation();
  const [data, setData] = useState<dataTypes | null>(null);

  useEffect(() => {
    axios.get(`${_api}/banner/`)
      .then(response => {
        setData(response.data);
      })
      .catch(err => {
        console.error("ma'lumotlarni olishda xatolik:", err);
      });
  }, []);

  return (
    <LazyLoadImage
      src={`https://urmonov.novacode.uz/${data?.image}`}
      loading="lazy"
      effect="blur"
      alt={
        i18n.language === "uz"
          ? data?.subtitle_uz
          : i18n.language === "ru"
          ? data?.subtitle_ru
          : data?.subtitle_en
      }
      className="h-[715px] object-cover object-right relative bottom-0 right-0"
    />
  );
}

export default AboutImg;