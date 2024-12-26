import { User } from '../types/index';

export default class UserInstance implements User {
    id: string;
    username: string;

    constructor(
        username: string,
    ) {
        this.id = Date.now().toString();
        this.username = username;
    }

    bookShelves() {
        return [];
    }

    readings() {
        return [];
    }
    
} 