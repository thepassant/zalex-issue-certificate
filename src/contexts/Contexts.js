import { createContext } from "react";
const initialDropdownContextValues = {
  isOpen: false,
  setOpen: () => {},
};

export const DropdownContext = createContext(initialDropdownContextValues);
