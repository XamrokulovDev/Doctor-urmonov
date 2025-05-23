import {
  FaTelegramPlane,
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

interface SocialsProps {
  link: string;
}

const Socials: React.FC<SocialsProps> = ({ link }) => {
  const encodedLink = encodeURIComponent(link);

  return (
    <div className="flex gap-4 justify-center items-center">
      <a
        href={`https://t.me/share/url?url=${encodedLink}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#229ED9] text-3xl hover:scale-110 transition"
      >
        <FaTelegramPlane />
      </a>

      <a
        href={`https://api.whatsapp.com/send?text=${encodedLink}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#25D366] text-3xl hover:scale-110 transition"
      >
        <FaWhatsapp />
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#4267B2] text-3xl hover:scale-110 transition"
      >
        <FaFacebookF />
      </a>

      <a
        href={`https://twitter.com/intent/tweet?url=${encodedLink}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#1DA1F2] text-3xl hover:scale-110 transition"
      >
        <FaTwitter />
      </a>

      <a
        href={`https://www.instagram.com/?url=${encodedLink}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#E4405F] text-3xl hover:scale-110 transition"
      >
        <FaInstagram />
      </a>

      <a
        href={`https://www.tiktok.com/share?url=${encodedLink}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-black text-3xl hover:scale-110 transition"
      >
        <FaTiktok />
      </a>
    </div>
  );
};

export default Socials;