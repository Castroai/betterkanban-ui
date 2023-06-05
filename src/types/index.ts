export interface Response {
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
    ownerId: number;
    tenantId: number;
    columns?: (ColumnsEntity)[] | null;
}
export interface ColumnsEntity {
    id: number;
    title: string;
    order: number;
    createdAt: string;
    updatedAt: string;
    boardId: number;
    tenantId: number;
    tasks?: (TasksEntity | null)[] | null;
}
export interface TasksEntity {
    id: number;
    title: string;
    description: string;
    order: number;
    createdAt: string;
    updatedAt: string;
    columnId: number;
    assignedToId?: null;
    cardTypeId: number;
    tenantId: number;
    cardType: CardType;
}
export interface CardType {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    tenantId: number;
}


export interface PromptResponse {
    id: string
    object: string
    created: number
    model: string
    usage: Usage
    choices: Choice[]
}

export interface Usage {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
}

export interface Choice {
    message: Message
    finish_reason: string
    index: number
}

export interface Message {
    role: string
    content: string
}
