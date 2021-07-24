export interface ListSentencesOptions {
    orderBy?: string,
    order?: 'asc' | 'desc',
    last?: string
}

export interface UpdateSentenceOptions {
    text?: string,
    category?: string
}

export interface CreateSentenceOptions {
    text: string,
    category: string
}