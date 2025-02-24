"use client";

import { createContext, useContext, useState } from "react";

const ToggleContext = createContext();
ToggleContext.displayName = "ToggleContext";

export function SidebarToggleProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((previousState) => !previousState);

  return (
    <ToggleContext.Provider value={{ isOpen, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
}

export function useToggle() {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error("useToggle must be used within a SidebarToggleProvider");
  }
  return context;
}
