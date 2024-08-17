import { useState, useEffect } from "react";

// 自定义 Hook 用于判断是否为 PC 端
function useIsPC() {
  const [isPC, setIsPC] = useState(window.innerWidth >= 640);

  useEffect(() => {
    const handleResize = () => setIsPC(window.innerWidth >= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isPC;
}

export default useIsPC;
