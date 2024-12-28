import {
    Book,
} from "../types/index";

export default class BookInstance implements Book {
    id: string;
    title: string;
    authorId: string;
    numPages: number;
    publishedYear: number;

    constructor(
        title: string,
        authorId: string,
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