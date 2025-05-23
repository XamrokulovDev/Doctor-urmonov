import { useEffect, useState } from "react";
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

const FooterLocation = () => {
  const [contact, setContact] = useState<Contact | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
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

  const getMapSrc = (htmlString: string): string | null => {
    const match = htmlString.match(/src="([^"]+)"/);
    return match ? match[1] : null;
  };

  const mapSrc = contact?.map_embed ? getMapSrc(contact.map_embed) : null;

  return (
    <div className="w-[800px] max-md:w-full h-[340px] rounded-[14px] overflow-hidden relative">
      {!mapLoaded && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">Xarita yuklanmoqda...</p>
        </div>
      )}
      {mapSrc ? (
        <iframe
          className="w-full h-full"
          src={mapSrc}
          allowFullScreen
          loading="lazy"
          style={{ border: 0 }}
          referrerPolicy="no-referrer-when-downgrade"
          title="location-map"
          onLoad={() => setMapLoaded(true)}
        />
      ) : (
        <p className="text-center text-gray-500 mt-10">Xarita mavjud emas</p>
      )}
    </div>
  );
};

export default FooterLocation;