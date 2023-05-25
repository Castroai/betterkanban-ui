import { ReactNode, createContext, useContext, useState } from "react";
import { useCookies } from "react-cookie";
interface AuthContextInterface {
  handleLogin: () => void;
  handleLogout: () => void;
  darkToggle: boolean;
  setDarkToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const [darkToggle, setDarkToggle] = useState(false);

  const [_cookies, setCookie, removeCookie] = useCookies(["authToken"]);
  const handleLogin = () => {
    // Simulating a successful login by setting the authToken in cookies
    setCookie("authToken", "your-auth-token-goes-here", { path: "/" });
  };

  const handleLogout = () => {
    // Removing the authToken cookie and setting authenticated to false
    removeCookie("authToken", { path: "/" });
  };

  return (
    <AuthContext.Provider
      value={{ handleLogin, handleLogout, darkToggle, setDarkToggle }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const withAuth = () => {
  const authContext = useContext(AuthContext);
  return authContext;
};
