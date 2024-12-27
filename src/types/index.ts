// Data models
export type Author = {
	id: string,
	name: string
};

export type Book = {
    id: string
    title: string,
    author: Author,
    numPages: number,
    publishedYear: number
};

export type BookShelf = {
    id: string,
    user_id: string,
    name: string,
};

export enum ReadingStatus {
    Started = 'STARTED',
    InProgress = 'IN_PROGRESS',
    Ended = 'ENDED'
}

export type Reading = {
    id: string,
    book: Book,
    status: ReadingStatus
    startDate: Date,
    endDate: Date
};

export type User = {
	id: string,
	username: string,
	bookShelves: () => BookShelf[],
	readings: () => Reading[]
}

// Data Storage Types
export interface HasId {
    id: string
}

export type DataStore = {
    users: User[],
    books: Book[],
    bookShelves: BookShelf[],
    readings: Reading[],
    authors: Author[]
};

export type DataStoreKey = keyof Pick<DataStore, 'users' | 'books' | 'bookShelves' | 'readings' | 'authors'>;

export enum Updatable {
    USERS = 'users',
    BOOKS = 'books',
    BOOK_SHELVES = 'bookShelves',
    READINGS ='readings',
    AUTHORS = 'authors',
}

export interface Storage {
    setItem(key: Updatable, value: any): void;
    getItem(key: Updatable): any;
    removeItem(key: Updatable, id: string): void;
    getDataStore(): DataStore;
}

// Login Service Types

export interface ILoginService {
    login(username: string): void;
    logout(): void;
    register(username: string): void;
    isLoggedIn(): boolean;
}

export type LoginState = {
    loggedIn: boolean,
    user: User | null
}
