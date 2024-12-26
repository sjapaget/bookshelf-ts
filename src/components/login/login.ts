

export default function loginComponent(): void {
    const container = document.querySelector('#app');
    if (!container) {
        throw new Error('Container element not found');
    }

    container.innerHTML = `
    <form
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

    const usernameInput = document.getElementById('username');
    const loginButton = document.getElementById('login-btn');

    if (!usernameInput ||!loginButton) {
        throw new Error('Input or button element not found');
    }

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        
    });

}