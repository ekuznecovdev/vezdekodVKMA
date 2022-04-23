import { useSelector } from "react-redux";

export const useViewData = (id) => {
  if (!id) {
    throw new Error("id required in hook useViewData");
  }
  const data = useSelector((s) => s.ui);
  return {
    activeView: data.activeView,
  };
};
