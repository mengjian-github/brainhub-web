import { useState, useEffect } from "react";
import useDeviceType from "./use-device-type";

const useKeyboardStatus = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const { isIOS, isAndroid } = useDeviceType();

  useEffect(() => {
    alert(window.innerHeight);
    let originHeight =
      document.documentElement.clientHeight || document.body.clientHeight;

    const handleResize = () => {
      let resizeHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      if (originHeight < resizeHeight) {
        setIsKeyboardVisible(false);
      } else {
        setIsKeyboardVisible(true);
      }
      originHeight = resizeHeight;
    };

    const handleFocus = () => {
      setIsKeyboardVisible(true);
      setTimeout(() => {
        alert(window.innerHeight);
      }, 500);
    };

    const handleBlur = () => {
      setIsKeyboardVisible(false);
    };

    if (isIOS) {
      const inputElements = document.querySelectorAll("input, textarea");

      inputElements.forEach((input) => {
        input.addEventListener("focus", handleFocus);
        input.addEventListener("blur", handleBlur);
      });

      return () => {
        inputElements.forEach((input) => {
          input.removeEventListener("focus", handleFocus);
          input.removeEventListener("blur", handleBlur);
        });
      };
    } else if (isAndroid) {
      window.visualViewport?.addEventListener("resize", handleResize);

      return () => {
        window.visualViewport?.removeEventListener("resize", handleResize);
      };
    }
  }, [isIOS, isAndroid]);

  return isKeyboardVisible;
};

export default useKeyboardStatus;
