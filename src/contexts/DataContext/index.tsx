import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { AllBoardResponse } from "../../types";
import { httpService } from "../../services/httpService";

interface Context {
    data: AllBoardResponse,
    moveCardToColum: ({ cardId, columnId }: {
        cardId: string;
        columnId: string;
    }) => void
}
const DataContext = createContext<Context>({} as Context)

export const DataWrapper = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<AllBoardResponse>([])
    const [loading, setLoading] = useState(true)
    const fetchData = async () => {
        const { data } = await httpService.get('/')
        setData(data)
        setLoading(false)
    }
    const moveCardToColum = ({ cardId, columnId }: { cardId: string, columnId: string }) => {
        console.log(cardId, columnId)
    }
    useEffect(() => {
        fetchData()
    }, [])
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