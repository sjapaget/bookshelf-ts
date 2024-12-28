import BookInstance from '../models/Book';
import {
    Updatable
} from '../types/index';

import DataStore from './storage';

export default class BookService {
    private dataStore: DataStore;

    constructor(dataStore?: DataStore) {
        this.dataStore = dataStore || new DataStore();
    }

    getAllBooks(): BookInstance[] {
        return this.dataStore.getItem(Updatable.BOOKS);
    }

    addBook(title: string, authorId: string, numPages: number, publishedYear: number): BookInstance {
        const newBook = new BookInstance(title, authorId, numPages, publishedYear);
        this.dataStore.setItem(Updatable.BOOKS, newBook);
        return newBook;
    }
    
    removeBook(id: string): void {
        this.dataStore.removeItem(Updatable.BOOKS, id);
    }
}