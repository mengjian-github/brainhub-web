import { useState, useEffect } from "react";

const useKeyboardStatus = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight < 500) {
        // 这个值可以根据需要调整
        setIsKeyboardVisible(true);
      } else {
        setIsKeyboardVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isKeyboardVisible;
};

export default useKeyboardStatus;
