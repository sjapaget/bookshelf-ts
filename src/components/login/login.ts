import LoginService from "../../services/login";


export default function loginComponent(): void {

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
        
    </form>`;

    
    const form = document.querySelector('#login-form');
    
    if (!form) {
        throw new Error('Login form element not found');
    }
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const usernameInput = form.querySelector('#username') as HTMLInputElement;

        if (!usernameInput) {
            throw new Error('Username input element not found');
        }

        const username = usernameInput.value.trim();

        if (!username) {
            alert('Username is required');
            return;
        }
        // TODO: Perform login logic here
        const loginService = new LoginService();
        loginService.login(username);
    });
}