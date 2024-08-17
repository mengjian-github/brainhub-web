import { useState, useEffect } from "react";

export const checkIsPC = () => {
  if (typeof window !== "undefined") {
    return window.innerWidth >= 640;
  }
  return false;
};

// 自定义 Hook 用于判断是否为 PC 端
function useIsPC() {
  const [isPC, setIsPC] = useState(checkIsPC());

  useEffect(() => {
    const handleResize = () => setIsPC(checkIsPC());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isPC;
}

export default useIsPC;
