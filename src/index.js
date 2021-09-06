import './style.css';
import WebpackLogo from './img/webpack-logo.svg'

const h1 = document.getElementsByTagName('h1')[0]
h1.classList.add('new-style');

const logo = document.createElement('img');
logo.src = WebpackLogo;

h1.appendChild(logo);
