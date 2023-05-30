import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface ThemeContextInterface {
  isDarkMode: boolean;
  setDarkToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
const ThemeContext = createContext<ThemeContextInterface>(
  {} as ThemeContextInterface
);

export const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setDarkToggle] = useState(localStorage.getItem('theme')==='dark'?true:false);

  useEffect(()=>{
    if (isDarkMode){
      localStorage.setItem('theme','dark')
    } else {
      localStorage.setItem('theme','light')
    }
  },[isDarkMode])
  return (
    <ThemeContext.Provider value={{ isDarkMode, setDarkToggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const withTheme = () => {
  const themeContext = useContext(ThemeContext);
  return themeContext;
};
