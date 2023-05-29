import { ReactNode, createContext, useContext, useState } from "react";

interface ThemeContextInterface {
  darkToggle: boolean;
  setDarkToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
const ThemeContext = createContext<ThemeContextInterface>(
  {} as ThemeContextInterface
);

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const [darkToggle, setDarkToggle] = useState(false);

  return (
    <ThemeContext.Provider value={{ darkToggle, setDarkToggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const withTheme = () => {
  const themeContext = useContext(ThemeContext);
  return themeContext;
};
