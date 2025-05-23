import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface InfoItem {
  uuid: string;
  name: string;
  image: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
}

const Patients = () => {
  const { t, i18n } = useTranslation();
  const _api = import.meta.env.VITE_API;
  const [review, setReviews] = useState<InfoItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<null | { type: "success" | "error"; message: string }>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get<InfoItem[]>(`${_api}/reviews/`);
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          setReviews([]);
        }
      } catch (err) {
        console.error("Ma'lumotlarni olishda xatolik:", err);
      }
    };

    fetchReviews();
  }, [_api]);

  const [formData, setFormData] = useState({
    name: "",
    image: null as File | null,
    description_uz: "",
    description_ru: "",
    description_en: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 3 * 1024 * 1024) {
      alert(t("form.image_size_error") || "Rasm hajmi 3MB dan oshmasligi kerak!");
      setFormData((prev) => ({
        ...prev,
        image: null,
      }));
      e.target.value = "";
    } else {
      setFormData((prev) => ({
        ...prev,
        image: file || null,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let description_uz = "";
    let description_ru = "";
    let description_en = "";

    if (i18n.language === "uz") {
      description_uz = formData.description_uz;
    } else if (i18n.language === "ru") {
      description_ru = formData.description_ru;
    } else {
      description_en = formData.description_en;
    }

    if (!formData.name || !formData.image || (!description_uz && !description_ru && !description_en)) {
      showNotification("error", t("form.required"));
      return;
    }

    const body = new FormData();
    body.append("name", formData.name);
    body.append("image", formData.image!);
    body.append("description_uz", description_uz);
    body.append("description_ru", description_ru);
    body.append("description_en", description_en);

    setIsSubmitting(true);

    try {
      console.log("Yuborilayotgan ma'lumot:", {
        name: formData.name,
        image: formData.image,
        description_uz,
        description_ru,
        description_en,
      });

      const response = await axios.post(`${_api}/review/`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        setFormData({
          name: "",
          image: null,
          description_uz: "",
          description_ru: "",
          description_en: "",
        });
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

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto bg-[#E7EEFE] rounded-[30px] my-20 px-20 max-md:px-10 p-10">
        <h1
          title={t("global_title.patients")}
          className="text-[#1F2A42] max-md:text-[28px] text-[48px] font-montserrat font-medium leading-[120%]"
        >
          {t("global_title.patients")}
        </h1>
        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-y-10 gap-x-16 mt-10">
          {review?.map((item) => (
            <div key={item.uuid} className="bg-white rounded-[20px] p-2">
              <div className="flex items-center gap-5 mb-5">
                <LazyLoadImage
                  src={`https://urmonov.novacode.uz/${item.image}`}
                  loading="lazy"
                  alt={
                    i18n.language === "uz"
                      ? item.description_uz
                      : i18n.language === "ru"
                      ? item.description_ru
                      : item.description_en
                  }
                  className="w-[88px] h-[69px] rounded-[15px] object-cover"
                />
                <h1
                  title={item.name}
                  className="text-[#0A0933] text-[24px] font-bold font-poppins"
                >
                  {item.name}
                </h1>
              </div>
              <p className="text-[#0A0933] text-[18px] font-normal font-montserrat">
                {i18n.language === "uz"
                  ? item.description_uz
                  : i18n.language === "ru"
                  ? item.description_ru
                  : item.description_en}
              </p>
            </div>
          ))}
        </div>
        <div className="w-full flex items-center justify-center mt-16">
          <button
            onClick={() => setIsModalOpen(true)}
            className="max-md:w-full cursor-pointer bg-[#0A6CFB] rounded-[5px] text-[20px] font-montserrat font-medium text-white px-8 py-5"
          >
            {t("global_title.patients_click")}
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
                  {t("form.desc_uz")}
                </h1>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 p-2">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t("form.name")}
                    className="w-full outline-none text-[#454745] placeholder:text-[#454745] rounded-[5px] bg-white border border-[#0A6CFB] px-5 py-4"
                  />
                  <label
                    htmlFor="image-upload"
                    className="w-full cursor-pointer text-start text-[#454745] placeholder:text-[#454745] border border-[#0A6CFB] rounded-[5px] px-5 py-4 bg-white font-montserrat"
                  >
                    {formData.image ? formData.image.name : t("form.upload_image")}
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {i18n.language === "uz" && (
                    <textarea
                      name="description_uz"
                      value={formData.description_uz}
                      onChange={handleInputChange}
                      placeholder={`Fikringizni qoldiring!`}
                      className="w-full outline-none text-[#454745] placeholder:text-[#454745] rounded-[5px] bg-white border border-[#0A6CFB] py-4 px-5 resize-y min-h-[100px]"
                    />
                  )}
                  {i18n.language === "ru" && (
                    <textarea
                      name="description_ru"
                      value={formData.description_ru}
                      onChange={handleInputChange}
                      placeholder={`Оставьте свой отзыв!`}
                      className="w-full outline-none text-[#454745] placeholder:text-[#454745] rounded-[5px] bg-white border border-[#0A6CFB] py-4 px-5 resize-y min-h-[100px]"
                    />
                  )}
                  {i18n.language === "en" && (
                    <textarea
                      name="description_en"
                      value={formData.description_en}
                      onChange={handleInputChange}
                      placeholder={`Leave your feedback!`}
                      className="w-full outline-none text-[#454745] placeholder:text-[#454745] rounded-[5px] bg-white border border-[#0A6CFB] py-4 px-5 resize-y min-h-[100px]"
                    />
                  )}

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

export default Patients