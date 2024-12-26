import {
    ILoginService,
    LoginState,
    Updatable,
    User
} from '../types/index';

import DataStore from './storage';

import loginComponent from '../components/login/login';

export default class LoginService implements ILoginService {
    LOGIN_KEY = 'bookshelf-ts-login';
    private dataStore: DataStore;

    constructor(dataStore?: DataStore) {
        this.dataStore = dataStore || new DataStore();
    }
    
    login(username: string): boolean {
        const allUsers: User[] = this.dataStore.getItem(Updatable.USERS);
        const existingUser = allUsers.find(user => user.username === username);
        if (existingUser) {
            const loginData: LoginState = {
                loggedIn: true,
                user: existingUser
            };
            localStorage.setItem(this.LOGIN_KEY, JSON.stringify(loginData));
            return true;
        } else {
            alert('User not found. Please register first.');
            throw new Error('Invalid username');
        }
    }

    logout(): void {
        localStorage.removeItem(this.LOGIN_KEY);
        window.location.href = '/';
    }

    isLoggedIn(): boolean {
        return !(localStorage.getItem(this.LOGIN_KEY) === null);
    }

    renderLoginComponent(): void {
        loginComponent(this);
    }

    successfulLogin(): void {
        window.location.href = '/'; // redirect to home page after successful login
    }

}