import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import AboutImg from "./AboutImg";
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

const About = () => {
  const _api = import.meta.env.VITE_API;
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<dataTypes | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<null | { type: "success" | "error"; message: string }>(null);

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const phoneRegex = /^(?:\+998|9)\d{8}$/;

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.full_name || !formData.phone || !formData.message) {
    showNotification("error", t("form.required"));
    return;
  }

  if (!phoneRegex.test(formData.phone)) {
    showNotification("error", t("form.phoneError"));
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await axios.post(`${_api}/contact/`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 || response.status === 201) {
      setFormData({ full_name: "", phone: "", message: "" });
      setIsModalOpen(false);
      showNotification("success", t("form.success"));
    } else {
      showNotification("error", t("form.error"));
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    showNotification("error", t("form.error"));
  } finally {
    setIsSubmitting(false);
  }
};

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${_api}/banner/`);
      setData(response.data);
    } catch (error) {
      console.error("ma'lumotlarni olishda xatolik:", error);
    }
  };

  fetchData();
  }, [_api]);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <>
      <div className="bg-[#F5F8FF] mt-36 my-20 max-xl:px-4 max-sm:px-0 max-lg:hidden">
        <div className="max-w-7xl mx-auto max-md:px-4 max-sm:px-0 flex max-lg:flex-col items-center justify-between relative pt-12 pb-18">
          <div className="w-[58%]">
            <h1
              title={
                i18n.language === "uz"
                ? data?.title_uz
                : i18n.language === "ru"
                ? data?.title_ru
                : data?.title_en
              }
              className="font-bold text-[#0A0933] font-poppins text-[75px] max-xl:text-[74px] leading-[140%] relative z-20"
            >
              {
                i18n.language === "uz"
                ? data?.title_uz
                : i18n.language === "ru"
                ? data?.title_ru
                : data?.title_en
              }
            </h1>
            <p className="text-[#0A0933] text-[36px] max-xl:text-[20px] max-md:text-[14px] max-sm:text-[10px] font-montserrat font-medium relative z-20 my-5 mb-10">
              {
                i18n.language === "uz"
                ? data?.subtitle_uz
                : i18n.language === "ru"
                ? data?.subtitle_ru
                : data?.subtitle_en
              }
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer bg-[#0A6CFB] rounded-[5px] text-[20px] max-md:text-[15px] max-sm:text-[10px] font-montserrat font-medium relative z-20 text-white px-8 py-5"
            >
              {t("about.button")}
            </button>
          </div>
          <LazyLoadImage
            src="https://res.cloudinary.com/dmgcfv5f4/image/upload/v1747227887/bg_tjoihm.png"
            alt={t("about.desc")}
            loading="lazy"
            className="h-full absolute top-0 left-0"
          />
          <div className="absolute -bottom-2 right-0">
            <AboutImg />
         </div>
        </div>
      </div>
      <div className="lg:hidden max-lg:mt-20 flex flex-col bg-[#F5F8FF] relative pt-8 px-4">
        <LazyLoadImage
          src="https://res.cloudinary.com/dmgcfv5f4/image/upload/v1747205024/Group_2_qx3zt1.png"
          alt={t("about.desc")}
          loading="lazy"
          className="h-full w-full absolute top-0 left-0"
        />
        <h1
          title="Урмонов Умиджон Бутабекович"
          className="relative font-bold text-[#0A0933] font-poppins text-[38px] leading-[140%]"
        >
          {t("about.title")}
        </h1>
        <p className="relative text-[#0A0933] text-[18px] font-montserrat my-4">{t("about.desc")}</p>
        <LazyLoadImage
          src={`https://urmonov.novacode.uz/${data?.image}`}
          loading="eager"
          alt={
            i18n.language === "uz"
            ? data?.subtitle_uz
            : i18n.language === "ru"
            ? data?.subtitle_ru
            : data?.subtitle_en
          }
          className="relative mb-16"
        />
        <div className="w-full absolute bottom-0 left-0 px-4">
          <button
            className="w-full flex items-center justify-center bg-[#0A6CFB] rounded-[5px] text-[20px] font-montserrat font-medium text-white py-5"
            onClick={() => setIsModalOpen(true)}
          >
            {t("about.button")}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="w-screen h-screen bg-[#00000063] backdrop-blur flex items-center justify-center fixed left-0 top-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="lg:w-xl w-[95vw] bg-[#F5F8FF] rounded-xl relative flex flex-col items-center justify-start pb-10 p-5"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center mt-5 w-full max-w-lg">
                <h1 className="font-semibold text-[#0A0933] font-montserrat text-[32px] mb-5">
                  {t("form.title")}
                </h1>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 p-2">
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    placeholder={t("form.name")}
                    className="w-full outline-none text-[#454745] placeholder:text-[#454745] rounded-[5px] bg-white border border-[#0A6CFB] px-5 py-4"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t("form.phone")}
                    className="w-full outline-none text-[#454745] placeholder:text-[#454745] rounded-[5px] bg-white border border-[#0A6CFB] px-5 py-4"
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t("form.message")}
                    className="w-full outline-none text-[#454745] placeholder:text-[#454745] rounded-[5px] bg-white border border-[#0A6CFB] py-4 px-5 resize-y min-h-[120px]"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-white bg-[#0A6CFB] rounded-[5px] text-[16px] font-montserrat font-medium py-4"
                  >
                    {isSubmitting ? t("form.loading") : t("form.send")}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Notifikatsiya */}
      <AnimatePresence>
        {notification && (
          <motion.div
            className={`fixed top-5 left-[50%] translate-x-[-50%] z-[9999] rounded-lg px-5 py-3 text-white font-medium shadow-xl ${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default About