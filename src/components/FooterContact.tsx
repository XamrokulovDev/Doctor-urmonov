import { SlLocationPin } from "react-icons/sl";
import { PiTelegramLogoBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";

interface SocialItem {
  instagram: string;
  telegram: string;
  youtube: string;
  whatsapp: string;
  linkedin: string;
  facebook: string;
  tiktok: string;
}

interface Contact {
  phone: string;
  email: string;
  map_embed: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
  address_uz: string;
  address_ru: string;
  address_en: string;
}

const FooterContact = () => {
  const { t, i18n } = useTranslation();
  const [contact, setContact] = useState<Contact | null>(null);
  const [social, setSocial] = useState<SocialItem | null>(null);
  const _api = import.meta.env.VITE_API;

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get(`${_api}/about-us/`);
        setContact(res.data);
      } catch (err) {
        console.error("Ma'lumotlarni olishda xatolik:", err);
      }
    };

    fetchContact();
  }, [_api]);

  useEffect(() => {
    const fetchSocial = async () => {
      try {
        const res = await axios.get(`${_api}/socials/`);
        setSocial(res.data);
      } catch (err) {
        console.error("Ma'lumotlarni olishda xatolik:", err);
      }
    };

    fetchSocial();
  }, [_api]);

  const currentLang = i18n.language || "uz";
  const address = contact
    ? currentLang === "ru"
      ? contact.address_ru
      : currentLang === "en"
      ? contact.address_en
      : contact.address_uz
    : "";

  return (
    <div className="flex flex-col items-center gap-5">
      {social?.telegram && (
        <a
          href={social.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="w-[368px] h-[81px] flex items-center justify-center gap-7 bg-gradient-to-r from-[#00A3FF] to-[#0779FF] text-white px-5 py-3 rounded-md transition"
        >
          <p className="text-[16px] font-bold font-montserrat leading-[100%]">
            {t("global_title.telegram")}
          </p>
          <PiTelegramLogoBold size={40} />
        </a>
      )}

      {social?.whatsapp && (
        <a
          href={social.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="w-[368px] h-[81px] flex items-center justify-center gap-7 bg-gradient-to-r from-[#42D85D] to-[#05B529] text-white px-5 py-3 rounded-md transition"
        >
          <p className="text-[16px] font-bold font-montserrat leading-[100%]">
            {t("global_title.whatsup")}
          </p>
          <FaWhatsapp size={40} />
        </a>
      )}

      <div className="w-[368px] max-md:w-full flex justify-between items-center mt-5">
        <div className="flex items-center gap-3">
          <FiPhoneCall size={28} />
          <p className="font-montserrat text-[#0A0933] flex flex-col items-start text-[13px] leading-[20px]">
            <span className="font-bold">{t("global_title.phone")}</span>
            {contact?.phone}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <MdOutlineEmail size={32} />
          <p className="font-montserrat text-[#0A0933] flex flex-col items-start text-[13px] leading-[20px]">
            <span className="font-bold">{t("global_title.email")}</span>
            {contact?.email}
          </p>
        </div>
      </div>

      <div className="w-[368px] flex items-center gap-3">
        <SlLocationPin size={28} />
        <p className="font-montserrat text-[#0A0933] flex flex-col items-start text-[13px] leading-[20px]">
          <span className="font-bold">{t("global_title.location")}</span>
          {address || "Manzil mavjud emas"}
        </p>
      </div>
    </div>
  );
};

export default FooterContact;