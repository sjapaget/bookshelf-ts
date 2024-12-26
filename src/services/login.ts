import {
    ILoginService,
    LoginState,
    Updatable,
    User
} from '../types/index';

import DataStore from './storage';

export default class LoginService implements ILoginService {
    LOGIN_KEY = 'bookshelf-ts-login';
    private dataStore: DataStore;

    constructor(dataStore: DataStore) {
        this.dataStore = dataStore || new DataStore();
    }
    
    login(username: string): void {
        const allUsers: User[] = this.dataStore.getItem(Updatable.USERS);
        const existingUser = allUsers.find(user => user.username === username);
        if (existingUser) {
            const loginData: LoginState = {
                loggedIn: true,
                user: existingUser
            };
            localStorage.setItem(this.LOGIN_KEY, JSON.stringify(loginData));
        } else {
            alert('User not found. Please register first.');
            throw new Error('Invalid username');
        }
    }
}