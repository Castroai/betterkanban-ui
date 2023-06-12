import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { CognitoUser } from "@aws-amplify/auth";
import { Hub, Auth } from "aws-amplify";

interface AuthContextInterface {
  user: any | undefined;
  loading: boolean;
}

const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<CognitoUser | null>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        console.log("Currently authenticated user:", user);
        setUser(user);
        setLoading(false);
        // Perform actions with the authenticated user
      } catch (error) {
        console.log("No currently authenticated user:", error);
        setLoading(false);
      }
    };
    fetchCurrentUser();

    const authListener = (data: any) => {
      const { payload } = data;
      if (payload.event === "signIn") {
        console.log("User signed in");
        setUser(payload.data);
        // Perform actions when a user signs in
      } else if (payload.event === "signOut") {
        setUser(null);
        console.log("User signed out");
        // Perform actions when a user signs out
      }
    };

    const listener = Hub.listen("auth", authListener);

    return () => {
      listener();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {loading ? "Loading...." : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
