export type AllBoardResponse = Response[]

export interface Response {
    id: number
    name: string
    userId: number
    columns: ColumnInterface[]
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
