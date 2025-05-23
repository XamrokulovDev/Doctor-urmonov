import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


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

const BioImg = () => {
  const { t, i18n } = useTranslation();
  const [bio, setBio] = useState<bioTypes | null>(null);
  const _api = import.meta.env.VITE_API;

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
    <div className="w-2xl max-lg:w-full relative">
      <LazyLoadImage 
        src={`https://urmonov.novacode.uz/${bio?.image}`}
        loading="lazy"
        alt={
          i18n.language === "uz"
          ? bio?.title_uz
          : i18n.language === "ru"
          ? bio?.title_ru
          : bio?.title_en
        } 
        className="object-contain rounded-xl"
      />
      <div className="bg-white w-[280px] max-sm:w-[180px] max-md:w-[250px] max-lg:w-[310px] flex items-end justify-start rounded-xl absolute bottom-0 left-0 pt-2 pr-2">
        <div className="w-[280px] max-sm:w-[180px] max-md:w-[260px] max-lg:w-[310px] bg-[#0A6CFB] rounded-[10px] text-white flex items-center gap-3 font-montserrat p-2">
          <h3 
            title={bio?.experience}
            className="font-semibold text-[36px] max-sm:text-[21px] max-md:text-[25px] max-lg:text-[30px]"
          >
            {bio?.experience}+
          </h3>
          <span className="flex flex-col items-start">
            <h4 title="Летний" className="text-[26px] max-sm:text-[12px] max-md:text-[18px] max-lg:text-[25px] font-medium font-montserrat">{t('bio.sub_title')}</h4>
            <p className="text-[14px] max-sm:text-[8px] max-md:text-[14px] max-lg:text-[18px] font-montserrat">{t('bio.sub_desc')}</p>
          </span>
        </div>
        <div className="bio-img-1 bg-transparent w-[35px] h-[30px] absolute top-[-30px] left-0"></div>
        <div className="bio-img-2 bg-transparent w-[35px] h-[30px] absolute bottom-[0] right-[-35px]"></div>
      </div>
    </div>
  )
}

export default BioImg;