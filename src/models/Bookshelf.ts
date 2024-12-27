import {
    BookShelf
} from "../types";

export default class BookShelfInstance implements BookShelf {

    id: string;
    user_id: string;
    name: string;

    constructor(
        user_id: string,
        name: string,
        id: string = Date.now().toString(),
    ) {
        this.id = id;
        this.user_id = user_id;
        this.name = name;
    }

    books(): [] {
        return [];
    }
}