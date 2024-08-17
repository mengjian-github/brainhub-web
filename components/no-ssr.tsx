import React, { useState, useEffect, ReactNode } from "react";

const DefaultOnSSR = () => <span></span>;

interface NoSSRProps {
  onSSR?: ReactNode;
  children: ReactNode;
}

const NoSSR: React.FC<NoSSRProps> = ({
  children,
  onSSR = <DefaultOnSSR />,
}) => {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    setCanRender(true);
  }, []);

  return canRender ? <>{children}</> : <>{onSSR}</>;
};

export default NoSSR;
