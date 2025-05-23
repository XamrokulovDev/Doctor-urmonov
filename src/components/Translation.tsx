import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "uz", label: "UZ" },
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
];

const Translation = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState<string>("ru");

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = event.target.value;
    setLang(selectedLang);
    i18n.changeLanguage(selectedLang);
    localStorage.setItem("language", selectedLang);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    const defaultLang = savedLang || "ru";
    i18n.changeLanguage(defaultLang);
    setLang(defaultLang);
  }, [i18n]);

  return (
    <div>
      <select
        value={lang}
        onChange={handleSelect}
        className="rounded-md px-1 py-2 text-md text-gray-700 focus:outline-none cursor-pointer"
      >
        {languages.map(({ code, label }) => (
          <option key={code} value={code} className="cursor-pointer">
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Translation;