import { useState } from "react";
import { DropdownContext } from "../../contexts/Contexts";

const DropdownContextProvider = ({ children }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <DropdownContext.Provider value={{ isOpen, setOpen }}>
      {children}
    </DropdownContext.Provider>
  );
};

export default DropdownContextProvider;
