import { useState, useEffect } from "react";

const useDeviceType = () => {
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;

    if (/iPad|iPhone|iPod/.test(userAgent)) {
      setIsIOS(true);
    } else if (/android/i.test(userAgent)) {
      setIsAndroid(true);
    }
  }, []);

  return { isIOS, isAndroid };
};

export default useDeviceType;
