
import LoginService from '../../services/login';
import BookshelfService from '../../services/bookshelf';
import BookService from '../../services/book';


export default class Dashboard {
    bookshelfService: BookshelfService;
    bookService: BookService;

    constructor(private loginService: LoginService) {
        if (!this.loginService.isLoggedIn()) {
            throw new Error('User not logged in');
        }
        this.loginService = loginService;
        this.bookshelfService = new BookshelfService();
        this.bookService = new BookService();
        this.render();
    }

    render(): void {
        const container: HTMLDivElement|null = document.querySelector('#navContainer');
        
        if (!container) {
            throw new Error('Container element not found');
        }

        this.renderNavbar(container);
        const appContainer: HTMLDivElement|null = document.querySelector('#app');
        if (!appContainer) {
            throw new Error('App container element not found');
        }
        this.renderDashboardContent(appContainer);
    }

    renderNavbar(container: HTMLDivElement): void {
        if (!container) {
            throw new Error('Container element not found');
        }

        const navbarHTML = document.createElement('div');

        navbarHTML.innerHTML = `
            <nav class="bg-gray-800">

                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div class="flex items-center justify-between h-16">

                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                
                            </div>

                            <div class="hidden md:block">
                                <div class="ml-10 flex items-baseline space-x-4">
                                    <a id="dashboard-btn" href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                                    <a id="book-shelves-btn" href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Bookshelves</a>
                                    <a id="books-btn" href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Books</a>
                                    <a id="authors-btn" href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Authors</a>

                                    <!-- Add more navigation links here -->
                                </div>

                            </div>

                        </div>

                        <div class="hidden md:block">

                            <div class="ml-4 flex items-center md:ml-6">
                                <p class="text-gray-300">${this.loginService.currentUser()?.username}</p>
                                <button id="logout-btn" class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </button>
                            </div>

                        </div>

                        <div class="-mr-2 flex md:hidden">
                            <!-- Mobile menu toggle button -->
                            <!-- Add your mobile menu toggle button here -->
                        </div>

                    </div>

                </div>

            </nav>
        `;

        const appContainer: HTMLDivElement|null = document.querySelector('#app');

        if (!appContainer) {
            throw new Error('App container element not found');
        }

        const logoutBtn = navbarHTML.querySelector('#logout-btn');
        if (!logoutBtn) {
            throw new Error('Logout button element not found');
        }
        logoutBtn.addEventListener('click', () => {
            this.loginService.logout();
        });

        const dashboardBtn = navbarHTML.querySelector('#dashboard-btn');
        if (!dashboardBtn) {
            throw new Error('Dashboard button element not found');
        }
        dashboardBtn.addEventListener('click', () => {
            this.renderDashboardContent(appContainer);
        });

        const bookShelvesBtn = navbarHTML.querySelector('#book-shelves-btn');
        if (!bookShelvesBtn) {
            throw new Error('Book shelves button element not found');
        }
        bookShelvesBtn.addEventListener('click', () => {
            this.renderBookshelves(appContainer);
        });

        const booksBtn = navbarHTML.querySelector('#books-btn');
        if (!booksBtn) {
            throw new Error('Books button element not found');
        }
        booksBtn.addEventListener('click', () => {
            this.renderBooks(appContainer);
        });

        const authorsBtn = navbarHTML.querySelector('#authors-btn');
        if (!authorsBtn) {
            throw new Error('Authors button element not found');
        }
        authorsBtn.addEventListener('click', () => {
            this.renderAuthors(appContainer);
        });

        container.appendChild(navbarHTML);
    }

    renderDashboardContent(container: HTMLDivElement): void {
        if (!container) {
            throw new Error('Container element not found');
        }

        container.innerHTML = `
            <div
                id="dashboard-container"
                class="toggleable"
            >
                <h2 class="text-2xl font-bold">Dashboard</h2>
                <div>
                    
                </div>
            </div>
            `;

        const dashboardContainer = container.querySelector('#dashboard-container');
        if (!dashboardContainer) {
            throw new Error('Dashboard container element not found');
        }
        
        container.replaceChildren(dashboardContainer);
    }
    
    renderBookshelves(container: Element|null): void {
        if (!container) {
            throw new Error('Container element not found');
        }
        
        let bookShelvesContainer = container.querySelector('#book-shelves-container');

        if (!bookShelvesContainer) {
            bookShelvesContainer = document.createElement('div');
        }

        bookShelvesContainer.innerHTML = `
            <div
                id="book-shelves-container"
                class="toggleable"
            >
                <div
                    class="flex gap-4"
                >
                    <h2 class="text-2xl font-bold">Book Shelves</h2>
                    <div class="flex gap-4">
                        <button
                            id="add-book-shelf-btn"
                            class="bg-green-500 p-2 rounded-md text-black-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                            Add New Book Shelf
                            </button>
                    </div>
                </div>
                <ul 
                    id="book-shelves-list"
                    class="list-disc"
                >
                </ul>
            </div>
        `;

        const bookShelvesList = bookShelvesContainer.querySelector('#book-shelves-list');
        if (!bookShelvesList) {
            throw new Error('Book shelves list element not found');
        }

        this.bookshelfService.getAllBookshelves().forEach((bookShelf) => {
            bookShelvesList.innerHTML += `
                <li
                    class="flex gap-4 m-4 justify-between hover:border-gray-200 p-4 rounded-md hover:shadow-lg"
                >
                    <span class="text-gray-600">    
                        ${bookShelf.name}
                    </span>
                    <button
                        id="delete-book-shelf-btn-${bookShelf.id}"
                        class="delete-book-shelf-btn bg-red-500 p-2 rounded-md text-white hover:text-black-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                        Delete
                    </button>
                </li>
            `;
        });

        const addBookshelfBtn = bookShelvesContainer.querySelector('#add-book-shelf-btn')
        if (!addBookshelfBtn) {
            throw new Error('Add book shelf button element not found');
        }
        addBookshelfBtn.addEventListener('click', () => {
            this.renderAddBookshelfForm(bookShelvesContainer);
        });

        const deleteBookShelfBtns = bookShelvesList.querySelectorAll('.delete-book-shelf-btn');
    
        deleteBookShelfBtns.forEach((deleteBtn) => {
            deleteBtn.addEventListener('click', () => {
                const bookShelfId = deleteBtn.id.replace('delete-book-shelf-btn-', '');
                this.bookshelfService.removeBookShelf(bookShelfId);
                this.renderBookshelves(container);
            });
        });

        container.replaceChildren(bookShelvesContainer);
    }

    renderBooks(container: Element|null): void {
        if (!container) {
            throw new Error('Container element not found');
        }

        let booksContainer = container.querySelector('#books-container');

        if (!booksContainer) {
            booksContainer = document.createElement('div');
        }

        booksContainer.innerHTML = `
            <div
                id="books-container"
                class="toggleable"
            >
                <div
                    class="flex gap-4"
                >
                    <h2 class="text-2xl font-bold">Books</h2>
                    <div class="flex gap-4">
                        <button
                            id="add-book-btn"
                            class="bg-green-500 p-2 rounded-md text-black-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                            Add New Book
                            </button>
                    </div>
                </div>
                <ul 
                    id="books-list"
                    class="list-disc"
                >
                </ul>
            </div>
        `;

        const addBookBtn = booksContainer.querySelector('#add-book-btn')
        if (!addBookBtn) {
            throw new Error('Add book button element not found');
        }
        addBookBtn.addEventListener('click', () => {
            this.renderAddBookForm(booksContainer);
        });

        const booksList = booksContainer.querySelector('#books-list');
        if (!booksList) {
            throw Error('Books list element not found');
        }

        this.bookService.getAllBooks().forEach((book) => {
            booksList.innerHTML += `
                <li
                    class="flex justify-between gap-4 m-4 hover:border-gray-200 p-4 rounded-md hover:shadow-lg"
                >
                    <span class="text-gray-600">    
                        ${book.title}
                    </span>
                    <button
                        id="delete-book-btn-${book.id}"
                        class="delete-book-btn bg-red-500 p-2 rounded-md text-white hover:text-black-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                        Delete
                    </button>
                </li>
            `;
        });

        const deleteBookBtns = booksList.querySelectorAll('.delete-book-btn');
        deleteBookBtns.forEach((deleteBtn) => {
            deleteBtn.addEventListener('click', () => {
                const bookId = deleteBtn.id.replace('delete-book-btn-', '');
                this.bookService.removeBook(bookId);
                this.renderBooks(container);
            });
        });

        container.replaceChildren(booksContainer);
    }

    renderAuthors(container: HTMLDivElement|null): void {
        if (!container) {
            throw new Error('Container element not found');
        }

        let authorsContainer = container.querySelector('#authors-container');

        if (!authorsContainer) {
            authorsContainer = document.createElement('div');
        }

        // retrieve all authors and generate HTML for them.
        authorsContainer.innerHTML = `
            <div
                id="authors-container"
                class="toggleable"
            >
                <h2 class="text-2xl font-bold">Authors</h2>
                <div class="flex gap-4">
                    <button
                        id="add-author-btn"
                        class="bg-green-500 p-2 rounded-md text-black-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                        Add New Author
                        </button>
                </div>
                <ul 
                    id="authors-list"
                    class="list-disc"
                >
                    <li>Author one</li>
                </ul>
            </div>
            `;

        const addAuthorBtn = authorsContainer.querySelector('#add-author-btn')
        if (!addAuthorBtn) {
            throw new Error('Add author button element not found');
        }
        addAuthorBtn.addEventListener('click', () => {
            // Add logic to create a new author
        });

        container.replaceChildren(authorsContainer);
    }

    renderAddBookshelfForm(container: Element|null): void {
        if (!container) {
            throw new Error('Container element not found');
        }

        let addBookshelfFormContainer = container.querySelector('#add-bookshelf-form-container');

        if (!addBookshelfFormContainer) {
            addBookshelfFormContainer = document.createElement('div');
        }
        addBookshelfFormContainer.innerHTML = `
            <div
                id="add-bookshelf-form-container"
                class="toggleable"
            >
                <h2 class="text-2xl font-bold">Add New Book Shelf</h2>
                <form id="add-bookshelf-form">
                    <div class="m-4">
                        <label for="bookshelf-name">Name:</label>
                        <input class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="bookshelf-name" name="bookshelf-name" required>
                    </div>
                    <button type="submit" class="bg-green-500 p-2 rounded-md text-white-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        Add Book Shelf
                    </button>
                </form>
            </div>
            `;

        const addBookshelfForm = addBookshelfFormContainer.querySelector('#add-bookshelf-form');
        if (!addBookshelfForm) {
            throw new Error('Add bookshelf form element not found');
        }
        addBookshelfForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const bookshelfNameInput: HTMLInputElement|null = addBookshelfForm.querySelector('#bookshelf-name');

            if (!bookshelfNameInput) {
                throw new Error('Bookshelf name input element not found');
            }

            const bookshelfName = bookshelfNameInput.value;

            this.bookshelfService.addBookShelf(
                bookshelfName,
                this.loginService.currentUser()?.id as string
            );

            this.renderBookshelves(container);
        });

        container.replaceChildren(addBookshelfFormContainer);
    }

    renderAddBookForm(container: Element|null): void {
        if (!container) {
            throw new Error('Container element not found');
        }

        let addBookFormContainer = container.querySelector('#add-book-form-container');

        if (!addBookFormContainer) {
            addBookFormContainer = document.createElement('div');
        }
        addBookFormContainer.innerHTML = `
            <div
                id="add-book-form-container"
                class="toggleable"
            >
                <h2 class="text-2xl font-bold">Add New Book</h2>
                <form id="add-book-form">
                    <div class="m-4">
                        <label for="book-title">Title:</label>
                        <input class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="book-title" name="book-title" required>
                    </div>
                    <div class="m-4">
                        <label for="book-author">Author:</label>
                        <select id="book-author" name="book-author" required>
                            <option value="">Select an author</option>
                            <option value="1">Author one</option>
                        </select>
                    </div>
                    <div class="m-4">
                        <label for="book-numPages">Number of Pages:</label>
                        <input class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="book-numPages" name="book-numPages" required>
                    </div>
                    <div class="m-4">
                        <label for="book-publishedYear">Published Year:</label>
                        <input class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="book-publishedYear" name="book-publishedYear" required>
                    </div>
                    <button type="submit" class="bg-green-500 p-2 rounded-md text-white-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        Add Book
                    </button>
                </form>
                </div>
                `;

        const addBookForm = addBookFormContainer.querySelector('#add-book-form');
        if (!addBookForm) {
            throw new Error('Add book form element not found');
        }

        // add author options to the select
        // const authors = this.authorService.getAllAuthors();
        // authors.forEach((author: Author[]) => {
        //     const authorOption = document.createElement('option');
        //     authorOption.value = author.id;
        //     authorOption.textContent = author.name;
        //     addBookForm.querySelector('#book-author').appendChild(authorOption);
        // });

        addBookForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const bookTitleInput: HTMLInputElement|null = addBookForm.querySelector('#book-title');
            const bookAuthorSelect: HTMLSelectElement|null = addBookForm.querySelector('#book-author');
            const bookNumPagesInput: HTMLInputElement|null = addBookForm.querySelector('#book-numPages');
            const bookPublishedYearInput: HTMLInputElement|null = addBookForm.querySelector('#book-publishedYear');

            if (!bookTitleInput ||!bookAuthorSelect || !bookNumPagesInput || !bookPublishedYearInput) {
                throw new Error('Book form input elements not found');
            }
            const bookTitle = bookTitleInput.value;
            const authorId = bookAuthorSelect.value;
            const numPages = bookNumPagesInput.value;
            const publishedYear = bookPublishedYearInput.value;
            
            // Add logic to create a new book
            this.bookService.addBook(
                bookTitle,
                parseInt(authorId),
                parseInt(numPages),
                parseInt(publishedYear)
            );

            this.renderBooks(container);
        });
        container.replaceChildren(addBookFormContainer);
    }
}
