import './style.css'
import {
    Updatable,
    User,
} from './types/index';
// import loginComponent from './components/login/login';
import LocalStorageService from './services/storage';

const storageService = new LocalStorageService();

const user: User = {
    id: '1',
    username: 'John Doe',
    bookShelves: () => [{
        id: '1',
        user_id: '1',
        name: 'John Doe\'s Bookshelf',
        books: []
    }],
    readings: []
}

storageService.setItem(Updatable.USERS, user);

storageService.removeItem(Updatable.USERS, '3');

const allUsers: User[] = storageService.getItem(Updatable.USERS);

console.log(allUsers);


// loginComponent();

