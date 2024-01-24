export interface MessageWithoutID {
    message: string;
    author: string;
    image: string | null,
}

export interface IMessages {
    id: string;
    message: string;
    author: string;
    image: string | null,
}