import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { CardType, Response } from "../../types";
import { httpService } from "../../services/httpService";
import { useAuth } from "../AuthContext";
// import { useAuthenticator } from "@aws-amplify/ui-react";
interface CreateNewCard {
  title: string;
  description: string;
  typeId: number;
  columnId: number;
}
interface Context {
  data: Response[] | undefined;
  moveCardToColum: ({
    cardId,
    columnId,
  }: {
    columnId: number;
    cardId: number;
  }) => Promise<void>;
  createNewCard: ({
    columnId,
    description,
    title,
    typeId,
  }: CreateNewCard) => Promise<void>;
  taskTypes: CardType[] | undefined;
}
const DataContext = createContext<Context>({} as Context);

export const DataWrapper = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Response[]>();
  const [taskTypes, setTaskTypes] = useState<CardType[]>();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const moveCardToColum = async ({
    cardId,
    columnId,
  }: {
    columnId: number;
    cardId: number;
  }) => {
    await httpService.put("/card", {
      columnId: columnId,
      cardId: cardId,
    });
    await fetchData();
  };

  const createNewCard = async ({
    columnId,
    description,
    title,
    typeId,
  }: CreateNewCard) => {
    await httpService.post("/card", {
      columnId,
      description,
      title,
      typeId,
    });
    await fetchData();
  };

  const fetchData = async () => {
    const { data } = await httpService.get("/board");
    const types = await httpService.get("/card_type");
    setData(data);
    setTaskTypes(types.data);
  };

  useEffect(() => {
    let isMounted = true;
    if (user !== undefined) {
      if (isMounted) {
        fetchData();
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
    return () => {
      isMounted = false; // Cleanup function to prevent state update on unmounted component
    };
  }, [user]);
  if (loading) {
    return <div>Loading ......</div>;
  }
  return (
    <DataContext.Provider
      value={{ data, moveCardToColum, createNewCard, taskTypes }}
    >
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => {
  return useContext(DataContext);
};
