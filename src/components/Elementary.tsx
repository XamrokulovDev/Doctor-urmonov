import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useCurrentPage } from "../utils/CurrentPage";
import { useTranslation } from "react-i18next";

const Elementary = () => {
  const { title, breadcrumb } = useCurrentPage();
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto bg-[#F5F8FF] flex items-center justify-center rounded-[20px] py-6 my-20">
      <span className="flex flex-col items-center gap-3">
        <h1 title="blog title" className="text-6xl max-md:text-5xl font-montserrat font-semibold">
          {title}
        </h1>
        <span className="flex items-center gap-1">
          <NavLink to="/" className="text-[18px] text-[#0A0933]">{t('navbar.home')}</NavLink>
          <MdOutlineKeyboardArrowRight size={21} />
          <span className="text-[18px] text-[#0A0933]">{breadcrumb}</span>
        </span>
      </span>
    </div>
  );
};

export default Elementary;