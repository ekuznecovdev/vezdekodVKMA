import { useSelector } from "react-redux";

export const useRouter = () => {
  const data = useSelector((s) => s.ui);
  return {
    ...data,
  };
};
