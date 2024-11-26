import { useEffect, useState } from "react";
import "./backtop.css";

export default function BackTop() {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {isShow && (
        <div onClick={handleScrollTop} className="back-top">
          <i className="fa-solid fa-chevron-up"></i>
        </div>
      )}
    </>
  );
}
