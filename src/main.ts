import './style.css'

import LoginService from './services/login';
import Dashboard from './components/dashboard/dashboard';

const loginService = new LoginService();
const loginState = loginService.isLoggedIn();

if (loginState) {
  new Dashboard(loginService)
} else {
    loginService.renderLoginComponent();
}

