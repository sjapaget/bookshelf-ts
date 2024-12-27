import {
    Book,
} from "../types";

export default class BookInstance implements Book {
    id: string;
    title: string;
    authorId: number
    numPages: number;
    publishedYear: number;

    constructor(
        title: string,
        authorId: number,
        numPages: number,
        publishedYear: number,
    ) {
        this.id = Date.now().toString(),
        this.title = title;
        this.authorId = authorId;
        this.numPages = numPages;
        this.publishedYear = publishedYear;
    }

}