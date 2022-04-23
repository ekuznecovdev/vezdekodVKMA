import { useSelector } from "react-redux";

export const useUserData = () => {
  const data = useSelector((s) => s.user);
  return {
    vkData: data.vkData,
  };
};
