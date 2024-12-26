import { 
    Storage,
    DataStore,
    Updatable,
    HasId,
    DataStoreKey 
} from '../types/index';

export default class LocalStorageService implements Storage {
    
    UPDATABLE_TO_STORE_KEY: Record<Updatable, DataStoreKey> = {
        [Updatable.USERS]: 'users',
        [Updatable.BOOKS]: 'books',
        [Updatable.BOOK_SHELVES]: 'bookShelves',
        [Updatable.READINGS]: 'readings',
        [Updatable.AUTHORS]: 'authors'
    };

    setItem(key: Updatable, value: HasId): void {
        const dataStore = this.getDataStore();
        
        if (!dataStore) {
            throw new Error('Data store not initialized');
        }
    
        const storeKey = this.UPDATABLE_TO_STORE_KEY[key];
        if (!storeKey) {
            throw new Error('Unsupported key');
        }
    
        const collection = dataStore[storeKey];
        this._updateOrAddItem(collection, value as any);
    
        // save the updated dataStore
        localStorage.setItem('bookshelf-ts', JSON.stringify(dataStore));
    }

    _updateOrAddItem<T extends HasId>(collection: T[], item: T): T[] {
        const existingItem = collection.find(existing => existing.id === item.id);
        if (existingItem) {
            const index = collection.indexOf(existingItem);
            collection[index] = item;
        } else {
            collection.push(item);
        }
        return collection;
    }

    getItem(key: Updatable, id?: string): any {
        const dataStore = this.getDataStore();
        if (!dataStore) {
            throw new Error('Data store not initialized');
        }
    
        const storeKey = this.UPDATABLE_TO_STORE_KEY[key];
        if (!storeKey) {
            throw new Error('Unsupported key');
        }
        if (!id) {
            return dataStore[storeKey];
        }

        return dataStore[storeKey].find(item => item.id === id);
    }

    removeItem(key: Updatable, id: string): void {
        const dataStore = this.getDataStore();
        if (!dataStore) {
            throw new Error('Data store not initialized');
        }

        const storeKey = this.UPDATABLE_TO_STORE_KEY[key];
        if (!storeKey) {
            throw new Error('Unsupported key');
        }

        const collection = dataStore[storeKey];
        const index = collection.findIndex(item => item.id === id);
        if (index > -1) {
            collection.splice(index, 1);
        }
        // save the updated dataStore
        localStorage.setItem('bookshelf-ts', JSON.stringify(dataStore));
    }

    getDataStore(): DataStore {

        let dataStoreString: string | null = localStorage.getItem('bookshelf-ts');

        if (!dataStoreString) {
            this._initializeDataStore();
            return this.getDataStore();  // get updated dataStore after initialization
        } 
        return JSON.parse(dataStoreString) as DataStore;
    }

    _initializeDataStore(): void {
        const initialDataStore: DataStore = {
            users: [],
            books: [],
            bookShelves: [],
            readings: [],
            authors: []
        };

        localStorage.setItem('bookshelf-ts', JSON.stringify(initialDataStore));
    }
}