
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
        const container: HTMLDivElement|null = document.querySelector('#app');
        
        if (!container) {
            throw new Error('Container element not found');
        }

        this.navbar(container);
    }

    navbar(container: HTMLDivElement): void {
        if (!container) {
            throw new Error('Container element not found');
        }

        container.innerHTML = `
            <nav class="bg-gray-800">

                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div class="flex items-center justify-between h-16">

                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                
                            </div>

                            <div class="hidden md:block">
                                <div class="ml-10 flex items-baseline space-x-4">
                                    <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                                    <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Bookshelves</a>
                                    <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Books</a>
                                    <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Authors</a>

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

        const logoutBtn = document.querySelector('#logout-btn');
        if (!logoutBtn) {
            throw new Error('Logout button element not found');
        }

        logoutBtn.addEventListener('click', () => {
            this.loginService.logout();
        });
    }
}
