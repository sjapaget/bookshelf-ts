
import LoginService from '../../services/login';

export default class Dashboard {

    constructor(private loginService: LoginService) {
        if (!this.loginService.isLoggedIn()) {
            throw new Error('User not logged in');
        }
        this.loginService = loginService;
        this.render();
    }

    render(): void {
        const container: HTMLDivElement|null = document.querySelector('#navContainer');
        
        if (!container) {
            throw new Error('Container element not found');
        }

        this.renderNavbar(container);
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
    

    renderBookshelves(container: HTMLDivElement): void {
        if (!container) {
            throw new Error('Container element not found');
        }
        
        let bookShelvesContainer = container.querySelector('#book-shelves-container');

        if (!bookShelvesContainer) {
            bookShelvesContainer = document.createElement('div');
        }

        // retrieve all this users bookshelves and generate HTML for them.

        bookShelvesContainer.innerHTML = `
            <div
                id="book-shelves-container"
                class="toggleable"
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
                    <ul 
                        id="book-shelves-list"
                        class="list-disc"
                    >
                        <li>Book one</li>
                    </ul>
            </div>
        `;

        const addBookshelfBtn = bookShelvesContainer.querySelector('#add-book-shelf-btn')
        if (!addBookshelfBtn) {
            throw new Error('Add book shelf button element not found');
        }

        addBookshelfBtn.addEventListener('click', () => {
            // Add logic to create a new book shelf
        });


        container.replaceChildren(bookShelvesContainer);
    }

    renderBooks(container: HTMLDivElement): void {
        if (!container) {
            throw new Error('Container element not found');
        }

        let booksContainer = container.querySelector('#books-container');

        if (!booksContainer) {
            booksContainer = document.createElement('div');
        }

        // retrieve all this users books and generate HTML for them.

        booksContainer.innerHTML = `
            <div
                id="books-container"
                class="toggleable"
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
                <ul 
                    id="books-list"
                    class="list-disc"
                >
                    <li>Book one</li>
                </ul>
            </div>
            `;

        const addBookBtn = booksContainer.querySelector('#add-book-btn')
        if (!addBookBtn) {
            throw new Error('Add book button element not found');
        }
        addBookBtn.addEventListener('click', () => {
            // Add logic to create a new book
        });

        container.replaceChildren(booksContainer);
    }

    renderAuthors(container: HTMLDivElement): void {
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
}
