import { useEffect, useState } from "react";

export const useOrign = () => {
  const [isMounted, setIsMounted] = useState(false);

  const orign =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return "";
  }

  return orign;
};
