import { useState, useEffect } from "react";
import useDeviceType from "./use-device-type";

const useKeyboardStatus = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const { isIOS, isAndroid } = useDeviceType();

  useEffect(() => {
    let initialScrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    let initialWindowHeight = window.innerHeight;

    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const estimatedKeyboardHeight = Math.abs(
        windowHeight - initialWindowHeight
      );

      if (estimatedKeyboardHeight > 100) {
        // 假设键盘高度大于100px时认为键盘可见
        setIsKeyboardVisible(true);
        setKeyboardHeight(estimatedKeyboardHeight);
      } else {
        setIsKeyboardVisible(false);
        setKeyboardHeight(0);
      }
    };

    const handleFocus = () => {
      const currentScrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const estimatedKeyboardHeight = Math.abs(
        currentScrollTop - initialScrollTop
      );
      alert(estimatedKeyboardHeight);
      if (estimatedKeyboardHeight > 100) {
        setKeyboardHeight(estimatedKeyboardHeight);
      } else {
        setKeyboardHeight(0);
      }
      setIsKeyboardVisible(true);
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

  return { isKeyboardVisible, keyboardHeight };
};

export default useKeyboardStatus;
