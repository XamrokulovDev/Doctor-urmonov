import { FC, useEffect, useState } from "react";
import {
  FaWhatsapp,
  FaFacebookF,
} from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineYoutube } from "react-icons/ai";
import { IoLogoInstagram } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { FaTiktok } from "react-icons/fa6";

import FooterContact from "./FooterContact";
import FooterLocation from "./FooterLocation";
import axios from "axios";

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

interface SocialItem {
  instagram: string;
  telegram: string;
  youtube: string;
  whatsapp: string;
  linkedin: string;
  facebook: string;
  tiktok: string;
}

const ContactSection: FC = () => {
  const { t, i18n } = useTranslation();
  const [contact, setContact] = useState<Contact | null>(null);
  const [social, setSocial] = useState<SocialItem | null>(null);
  const API_URL = import.meta.env.VITE_API;

  useEffect(() => {
    const getContact = async () => {
      try {
        const res = await axios.get(`${API_URL}/about-us/`);
        setContact(res.data);
      } catch (err) {
        console.error("Contact ma'lumotlarini olishda xatolik:", err);
      }
    };

    getContact();
  }, [API_URL]);

  useEffect(() => {
    const getSocial = async () => {
      try {
        const res = await axios.get(`${API_URL}/socials/`);
        setSocial(res.data);
      } catch (err) {
        console.error("Social ma'lumotlarini olishda xatolik:", err);
      }
    };

    getSocial();
  }, [API_URL]);

  return (
    <>
      <section className="bg-[#F8F9FF] text-gray-900 px-4 md:px-10 py-10">
        <h2 title={t('global_title.contact')} className="text-center text-[#0A0933] max-md:text-[28px] text-[48px] font-bold mb-10">
          {t('global_title.contact')}
        </h2>
        <div className="max-w-7xl mx-auto flex max-md:flex-col gap-10 max-md:gap-12 items-center justify-between">
          <FooterContact />
          <FooterLocation />
        </div>
        <div className="max-w-7xl mx-auto border-t border-gray-300 my-14"></div>
        <footer className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <h1 className="text-[46px] font-poppins font-bold leading-[102%] mb-4">Doctor Urmonov</h1>
            <div className="flex items-center gap-3">
              {social?.facebook && (
                <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                  <FaFacebookF size={35} className="bg-white p-1 text-[#0A0933] hover:text-blue-600 cursor-pointer transition-all duration-300" />
                </a>
              )}
              {social?.instagram && (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                  <IoLogoInstagram size={42} className="bg-white p-1 text-[#0A0933] hover:text-pink-500 cursor-pointer transition-all duration-300" />
                </a>
              )}
              {social?.telegram && (
                <a href={social.telegram} target="_blank" rel="noopener noreferrer">
                  <PiTelegramLogo size={38} className="bg-white p-1 text-[#0A0933] hover:text-sky-500 cursor-pointer transition-all duration-300" />
                </a>
              )}
              {social?.whatsapp && (
                <a href={social.whatsapp} target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp size={38} className="bg-white p-1 text-[#0A0933] hover:text-green-500 cursor-pointer transition-all duration-300" />
                </a>
              )}
              {social?.youtube && (
                <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                  <AiOutlineYoutube size={43} className="bg-white p-1 text-[#0A0933] hover:text-red-600 cursor-pointer transition-all duration-300" />
                </a>
              )}
              {social?.tiktok && (
                <a href={social.tiktok} target="_blank" rel="noopener noreferrer">
                  <FaTiktok size={35} className="bg-white p-1 text-[#0A0933] hover:text-red-600 cursor-pointer transition-all duration-300" />
                </a>
              )}
            </div>
          </div>
          <div className="md:hidden flex items-center justify-between">
            <div className="text-[#0A0933] font-montserrat">
              <h4 className="text-[16px] font-bold mb-2">{t('footer.date')}</h4>
              <p className="flex flex-col gap-2 mt-4">
                <span className="font-medium">{t('footer.month')}</span>
                <span>09:00 - 18:00</span>
              </p>
              <p className="flex flex-col gap-2 mt-4">
                <span className="font-medium">{t('footer.hours')}</span>
                <span>10:00 - 16:00</span>
              </p>
            </div>
            <div className="text-[#0A0933] font-montserrat">
              <h4 className="text-[16px] font-bold mb-4">{t('footer.menu')}</h4>
              <ul className="space-y-1">
                <li>{t('footer.home')}</li>
                <li>{t('footer.about')}</li>
                <li>{t('footer.service')}</li>
                <li>{t('footer.blog')}</li>
                <li>{t('footer.media')}</li>
              </ul>
            </div>
          </div>
          <div className="text-[#0A0933] font-montserrat max-md:hidden">
            <h4 className="text-[16px] font-bold mb-2">{t('footer.date')}</h4>
            <p className="flex flex-col gap-2 mt-4">
              <span className="font-medium">{t('footer.month')}</span>
              <span>09:00 - 18:00</span>
            </p>
            <p className="flex flex-col gap-2 mt-4">
              <span className="font-medium">{t('footer.hours')}</span>
              <span>10:00 - 16:00</span>
            </p>
          </div>
          <div className="text-[#0A0933] font-montserrat max-md:hidden">
            <h4 className="text-[16px] font-bold mb-4">{t('footer.menu')}</h4>
            <ul className="space-y-1">
              <li>{t('footer.home')}</li>
              <li>{t('footer.about')}</li>
              <li>{t('footer.service')}</li>
              <li>{t('footer.blog')}</li>
              <li>{t('footer.media')}</li>
            </ul>
          </div>
          <div className="text-[#0A0933] font-montserrat">
            <h4 className="text-[16px] font-bold mb-4">{t('footer.address.address')}</h4>
            <p className="mb-2">
              {i18n.language === "uz"
                ? contact?.address_uz
                : i18n.language === "ru"
                  ? contact?.address_ru
                  : contact?.address_en
              }
            </p>
            <div className="flex items-center justify-between gap-5 mt-4">
              <div className="flex items-center gap-3">
                <FiPhoneCall size={18} />
                <p className="flex flex-col items-start text-[10px] leading-[14px]">
                  <span className="font-bold">{t('global_title.phone')}</span>
                  {contact?.phone}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <MdOutlineEmail size={18} />
                <p className="flex flex-col items-start text-[10px] leading-[14px]">
                  <span className="font-bold">{t('global_title.email')}</span>
                  {contact?.email}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </section>
      <div className="w-full bg-[#F5F8FF] mt-20 py-10">
        <p className="text-center text-[#454745] text-[14px] leading-[14px] font-montserrat">
          © {t('footer.address.desc')}
        </p>
      </div>
    </>
  );
};

export default ContactSection;