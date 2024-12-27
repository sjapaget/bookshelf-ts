import BookShelfInstance from '../models/Bookshelf';
import {
    BookShelf,
    Updatable
} from '../types/index';

import DataStore from './storage';

export default class BookshelfService {
    // Implement methods for managing bookshelves
    // (add, remove, update, get all)
    // Make sure to handle any necessary error handling
    // and to return appropriate responses
    // for each operation
    // (e.g., success, failure, updated data)

    private dataStore: DataStore;

    constructor(dataStore?: DataStore) {
        this.dataStore = dataStore || new DataStore();
    }

    getAllBookshelves(): BookShelf[] {
        return this.dataStore.getItem(Updatable.BOOK_SHELVES);
    }

    addBookShelf(name: string, userId: string): BookShelf {
        const newBookShelf = new BookShelfInstance(userId, name);
        this.dataStore.setItem(Updatable.BOOK_SHELVES, newBookShelf);
        return newBookShelf;
    }
}