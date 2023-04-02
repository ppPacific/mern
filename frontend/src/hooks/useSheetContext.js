import { useContext } from "react";
import { SheetContext } from "../context/SheetContext";

export const useSheetContext = () => {
  const context = useContext(SheetContext);

  if (!context) {
    throw Error("must be used inside sheetContextProvider");
  }
  return context;
};
