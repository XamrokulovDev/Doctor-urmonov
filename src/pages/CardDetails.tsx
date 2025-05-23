import React, { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TiArrowForwardOutline } from "react-icons/ti";
import { useTranslation } from 'react-i18next';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Socials = React.lazy(() => import('../components/Socials'));
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
  date: string;
  hashtags: {
    title_uz: string;
    title_ru: string;
    title_en: string;
  }[];
}

const BlogCardDetails = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const _api = import.meta.env.VITE_API;
  const [card, setCard] = useState<cardItem | null>(null);
  const [cards, setCards] = useState<cardItem[]>([]);
  const [showSocials, setShowSocials] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get(`${_api}/new/${id}`)
        .then(res => setCard(res.data))
        .catch(err => console.error("Xatolik yuz berdi:", err));
    }
  }, [id]);

  useEffect(() => {
    axios.get(`${_api}/news/`)
      .then(res => {
        if (Array.isArray(res.data)) setCards(res.data);
        else setCards([]);
      })
      .catch(err => console.error("Xatolik yuz berdi:", err));
  }, []);

  const handleCardClick = (uuid: string) => {
    axios.get(`${_api}/new/${uuid}`)
      .then(res => {
        setCard(res.data);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(err => console.error("Xatolik yuz berdi:", err));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <div className='max-lg:px-4'>
        <Suspense fallback={<div className="fixed top-[50%] left-[50%] translate-x-[-50%]"></div>}>
          <Elementary />
        </Suspense>
        <div className="max-w-7xl mx-auto flex items-start max-lg:flex-col gap-10 mb-52 py-8">
          <div className="w-[65%] max-lg:w-full bg-[#F5F8FF] rounded-[20px] p-4">
            <LazyLoadImage
              src={`https://urmonov.novacode.uz/${card?.image}`}
              loading="lazy"
              alt={
                i18n.language === "uz"
                  ? card?.title_uz
                  : i18n.language === "ru"
                    ? card?.title_ru
                    : card?.title_en
              }
              className="w-full rounded-[10px]"
            />
            <h1 className='text-[26px] max-md:text-[20px] font-montserrat font-bold text-[#0A0933] leading-[140%] pt-5 py-3'>
              {
                i18n.language === "uz"
                  ? card?.title_uz
                  : i18n.language === "ru"
                    ? card?.title_ru
                    : card?.title_en
              }
            </h1>
            <div
              className="text-[20px] max-md:text-[17px] leading-[140%]"
              dangerouslySetInnerHTML={{
                __html:
                  i18n.language === "uz"
                    ? card?.description_uz || ""
                    : i18n.language === "ru"
                      ? card?.description_ru || ""
                      : card?.description_en || ""
              }}
            ></div>
            <div className="flex justify-between items-end max-md:flex-col max-md:items-start max-md:gap-2">
              <div className="w-[50%] flex items-center gap-3 flex-wrap max-md:mt-8">
                {card?.hashtags.map((item, index) => (
                  <p key={index} className='text-[#0A6CFB] text-[14px]'>
                    {
                      i18n.language === "uz"
                        ? item.title_uz
                        : i18n.language === "ru"
                          ? item.title_ru
                          : item.title_en
                    }
                  </p>
                ))}
              </div>
              <div className="flex items-center max-md:w-full max-md:justify-between gap-2 text-[18px] font-montserrat font-normal text-[#454745] mt-10 max-md:mt-5">
                <p className='border-r-2 border-[#E1E1E1] max-md:border-none pr-4'>{card?.date}</p>
                <button
                  className='text-[#0A6CFB] flex items-center gap-1'
                  onClick={() => setShowSocials(true)}
                >
                  <span className='font-normal text-[18px]'>{t('global_title.share')}</span>
                  <TiArrowForwardOutline className='text-[19px] mb-[2px]' />
                </button>
              </div>
            </div>
          </div>
          <div className="w-[35%] flex flex-col gap-3 max-lg:w-full sticky top-10 self-start">
            {cards.map((item) => (
              <div
                key={item.uuid}
                className="bg-[#F5F8FF] rounded-[10px] flex flex-col cursor-pointer"
              >
                <button
                  onClick={() => handleCardClick(item.uuid)}
                  className="flex justify-between items-center px-5 py-3 focus:outline-none"
                >
                  <p className="w-[70%] text-[18px] leading-[140%] font-montserrat font-medium text-start">
                    {
                      i18n.language === "uz"
                        ? item.title_uz
                        : i18n.language === "ru"
                          ? item.title_ru
                          : item.title_en
                    }
                  </p>
                  <span className='bg-white w-[30px] h-[30px] rounded-full flex justify-center items-center'>
                    <MdKeyboardArrowRight
                      size={23}
                      className={`text-[#0A6CFB] transition-transform duration-300`}
                    />
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showSocials && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-black/50 z-[9999] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSocials(false)}
          >
            <motion.div
              className="bg-white rounded-lg pb-8 p-5 w-[320px] max-w-[90%]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-10 text-center">{t("global_title.share")}</h2>
              <Suspense fallback={<div className="fixed top-[50%] left-[50%] translate-x-[-50%]"></div>}>
                <Socials link={window.location.href} />
              </Suspense>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BlogCardDetails;