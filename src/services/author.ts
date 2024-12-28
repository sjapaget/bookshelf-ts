import AuthorInstance from '../models/Author';
import {
    Updatable,
    Author
} from '../types';
import DataStore from './storage';

export default class AuthorService {
    private dataStore: DataStore;

    constructor(dataStore?: DataStore) {
        this.dataStore = dataStore || new DataStore();
    }

    getAllAuthors(): Author[] {
        return this.dataStore.getItem(Updatable.AUTHORS);
    }

    getAuthorById(id: string): Author | undefined {
        const author = this.dataStore.getItem(Updatable.AUTHORS, id);
        return author;
    }

    addAuthor(name: string): Author {
        const newAuthor = new AuthorInstance(name);
        this.dataStore.setItem(Updatable.AUTHORS, newAuthor);
        return newAuthor;
    }

    removeAuthor(id: string): void {
        this.dataStore.removeItem(Updatable.AUTHORS, id);
    }
}