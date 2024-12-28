import { Author } from '../types/index';

export default class AuthorInstance implements Author {
    id: string;
    name: string;
    
    constructor(
        name: string,
    ) {
        this.id = Date.now().toString();
        this.name = name;
    }
}