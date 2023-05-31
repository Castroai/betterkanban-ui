import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { AllBoardResponse } from "../../types";
import { httpService } from "../../services/httpService";
import { useAuthenticator } from "@aws-amplify/ui-react";

interface Context {
    data: AllBoardResponse,
    moveCardToColum: ({ cardId, columnId }: {
        columnId: number;
        cardId: number;
    }) => Promise<void>
}
const DataContext = createContext<Context>({} as Context)

export const DataWrapper = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<AllBoardResponse>([])
    const { user } = useAuthenticator()
    const [loading, setLoading] = useState(true)

    const moveCardToColum = async ({ cardId, columnId }: { columnId: number, cardId: number }) => {
        await httpService.put('/', {
            columnId: columnId,
            cardId: cardId
        })
        await fetchData()
    }

    const fetchData = async () => {
        const { data } = await httpService.get('/')
        setData(data)
        setLoading(false)
    }

    useEffect(() => {
        let isMounted = true;
        if (user !== undefined) {
            if (isMounted) {
                fetchData()
            }
        } else {
            setLoading(false)
        }
        return () => {
            isMounted = false; // Cleanup function to prevent state update on unmounted component
        };
    }, [user])
    if (loading) {
        return (
            <div>Loading ......</div>
        )
    }
    return <DataContext.Provider value={{ data, moveCardToColum }}>
        {children}
    </DataContext.Provider>
}
export const useData = () => {
    return useContext(DataContext)
}