import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import axios from "axios";

interface InfoItem {
  uuid: string;
  confirmed: boolean;
  question_uz: string;
  question_ru: string;
  question_en: string;
  answer_uz: string;
  answer_ru: string;
  answer_en: string;
}

const Information = () => {
  const { t, i18n } = useTranslation();
  const _api = import.meta.env.VITE_API;
  const [faqs, setFaqs] = useState<InfoItem[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<null | { type: "success" | "error"; message: string }>(null);

  useEffect(() => {
  const fetchFaqs = async () => {
    try {
      const response = await axios.get(`${_api}/faqs/`);
      if (Array.isArray(response.data)) {
        setFaqs(response.data);
      } else {
        setFaqs([]);
      }
    } catch (error) {
      console.error("Ma'lumotlarni olishda xatolik:", error);
    }
  };

  fetchFaqs();
}, []);

  const [formData, setFormData] = useState({
  question: "",
});

const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  setFormData({ question: e.target.value });
};

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const currentLang = i18n.language;
  const questionValue = formData.question;

  if (!questionValue) {
    showNotification("error", t("form.required"));
    return;
  }

  const body = new FormData();
  body.append("question_uz", currentLang === "uz" ? questionValue : "");
  body.append("question_ru", currentLang === "ru" ? questionValue : "");
  body.append("question_en", currentLang === "en" ? questionValue : "");

  setIsSubmitting(true);

  try {
    const response = await axios.post(`${_api}/faq/`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200 || response.status === 201) {
      setFormData({ question: "" });
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

  const toggleOpen = (uuid: string) => {
    setOpenId(openId === uuid ? null : uuid);
  };

  return (
    <>
    <div className="max-w-7xl mx-auto my-20 max-md:px-4">
      <h1 title={t("global_title.info")} className="text-[48px] max-md:text-[28px] leading-[140%] font-semibold text-center">
        {t("global_title.info")}
      </h1>
      <div className="flex flex-col items-center justify-center gap-4 px-24 max-md:px-0 mt-10">
        {faqs.map((item, index) => {
          const isOpen = openId === item.uuid;

          return (
            <motion.div
              key={item.uuid}
              className="w-full cards bg-[#1F2A42] cursor-pointer rounded-[10px] overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between p-5" onClick={() => toggleOpen(item.uuid)}>
                <h1
                  title={
                    i18n.language === "uz"
                      ? item.question_uz
                      : i18n.language === "ru"
                      ? item.question_ru
                      : item.question_en
                  }
                  className="text-[24px] max-md:text-[20px] leading-[140%] font-medium text-white w-[90%] flex items-start gap-1"
                >
                  <span>{index + 1}.</span>{" "}
                  {i18n.language === "uz"
                    ? item.question_uz
                    : i18n.language === "ru"
                    ? item.question_ru
                    : item.question_en}
                </h1>
                <motion.button
                  className="w-[30px] h-[30px] bg-white flex items-center justify-center rounded-full"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence mode="wait">
                    {isOpen ? (
                      <motion.div
                        key="arrow-down"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <IoIosArrowDown size={18} className="text-[#1F2A42] cursor-pointer" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="arrow-forward"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <IoIosArrowForward size={18} className="text-[#1F2A42] cursor-pointer" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                      transition: {
                        height: { duration: 0.3 },
                        opacity: { duration: 0.3, delay: 0.1 },
                      },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: { duration: 0.3 },
                        opacity: { duration: 0.1 },
                      },
                    }}
                    className="bg-[#F5F8FF] rounded-b-[10px]"
                  >
                    <div className="text-[#0A0933] pt-12 p-5">
                      <div
                        className="text-[18px] leading-[160%]"
                        dangerouslySetInnerHTML={{
                          __html:
                            i18n.language === "uz"
                              ? item.answer_uz
                              : i18n.language === "ru"
                              ? item.answer_ru
                              : item.answer_en,
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
      <div className="w-full flex items-center justify-center mt-16">
        <button 
          onClick={() => setIsModalOpen(true)}
          className='cursor-pointer bg-[#0A6CFB] rounded-[5px] text-[20px] font-montserrat font-medium text-white px-8 py-5'
        >
          {t('global_title.info_click')}
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
                  {t("global_title.info_title")}
                </h1>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 p-2">
                  <textarea
                    name="question"
                    value={formData.question}
                    onChange={handleInputChange}
                    placeholder={
                      i18n.language === "uz"
                        ? "Savolingizni qoldiring!"
                        : i18n.language === "ru"
                        ? "Оставьте свой вопрос!"
                        : "Leave your question!"
                    }
                    className="w-full outline-none text-[#454745] placeholder:text-[#454745] rounded-[5px] bg-white border border-[#0A6CFB] py-4 px-5 resize-y min-h-[100px]"
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
  );
};

export default Information;