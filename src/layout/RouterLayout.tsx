import React, { useState, useEffect, Suspense } from "react";
import { Outlet } from "react-router-dom";
import ContactSection from "../components/ContactSection";
import { IoIosArrowUp } from "react-icons/io";

const Navbar = React.lazy(() => import('../components/Navbar'));

const RouterLayout = () => {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Suspense fallback={<div></div>}>
        <Navbar />
      </Suspense>
      <Outlet />
      <ContactSection />
      {showScrollBtn && (
        <div className="rounded-full w-13 h-13 flex items-center justify-center shadow-lg border border-gray-200 bg-white fixed bottom-12 right-12 max-lg:right-4 max-lg:bottom-5 z-[99]">
          <button
            onClick={scrollToTop}
            className="text-[#0A6CFB]"
            aria-label="Scroll to top"
          >
            <IoIosArrowUp size={23} />
          </button>
        </div>
      )}
    </div>
  );
};

export default RouterLayout;