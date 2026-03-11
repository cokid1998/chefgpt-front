import { useState, useEffect } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    setIsMobile(media.matches);

    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, []);

  return isMobile;
};

export default useIsMobile;
