export type AllBoardResponse = Response[]

export interface Response {
    id: number
    name: string
    userId: number
    columns: ColumnInterface[]
    cardTypes: CardType[]
}

export interface ColumnInterface {
    id: number
    name: string
    boardId: number
    cards: CardInterface[]
}

export interface CardInterface {
    id: number
    title: string
    typeId: number
    description: string
    columnId: number
    assignee: any
    dueDate: any
    createdDate: string
}
export interface CardType {
    id: string
    name: string
    tenantId: string
}