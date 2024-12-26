import LoginService from "../../services/login";


export default function loginComponent(loginService: LoginService): void {

    const container = document.querySelector('#app');
    if (!container) {
        throw new Error('Container element not found');
    }

    container.innerHTML = `
        <form
            action="#"
            id="login-form"
            class="max-w-md mx-auto"
        >
            <h2 class="text-2xl font-semibold text-gray-800">Login:</h2>
            <input 
                type="text"
                id="username"
                placeholder="Username"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />

            <button
                class="p-2 bg-blue-500 text-white rounded-md mt-4 w-full"
                id="login-btn"
            >
                Login
            </button>
            
        </form>

        <form
            action="#"
            id="register-form"
            class="max-w-md mx-auto mt-8"
        >
            <h2 class="text-2xl font-semibold text-gray-800">Register:</h2>
            <input 
                type="text"
                id="register-username"
                placeholder="Username"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />

            <button
                class="p-2 bg-blue-500 text-white rounded-md mt-4 w-full"
                id="register-btn"
            >
                Register
            </button>
        </form>
    `;

    
    const loginForm = document.querySelector('#login-form');
    
    if (!loginForm) {
        throw new Error('Login form element not found');
    }
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const usernameInput = loginForm.querySelector('#username') as HTMLInputElement;

        if (!usernameInput) {
            throw new Error('Username input element not found');
        }

        const username = usernameInput.value.trim();

        if (!username) {
            alert('Username is required');
            return;
        }

        if (loginService.login(username)) {
            loginForm.remove();
            loginService.successfulLogin();
        } else {
            alert('Failed to login. Please try again');
        }
    });

    const registerForm = document.querySelector('#register-form');

    if (!registerForm) {
        throw new Error('Register form element not found');
    }
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const usernameInput = registerForm.querySelector('#register-username') as HTMLInputElement;

        if (!usernameInput) {
            throw new Error('Username input element not found');
        }

        const username = usernameInput.value.trim();

        if (!username) {
            alert('Username is required');
            return;
        }

        if (username.length < 3) {
            alert('Username should be at least 3 characters long');
            return;
        }

        loginService.register(username);
    });
}