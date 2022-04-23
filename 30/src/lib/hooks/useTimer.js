import { useEffect, useState } from "react";

export const useTimer = (maxValue) => {
  const [data, setData] = useState(maxValue);
  useEffect(() => {
    const t = setInterval(() => {
      setData(data - 1);
    }, 1000);
    return () => clearInterval(t);
  }, [data]);
  return data;
};
