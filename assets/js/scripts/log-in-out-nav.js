import { getCookie } from './cookies.js'

/* log-in | log-out nav change */

function logInOutNav(cookieName) {
    let logOutNav = document.getElementById('log-out')
    let logInNav = document.getElementById('log-in')

    if (getCookie(cookieName)) {
        logOutNav.style.display = 'inline';
        logInNav.style.display = 'none';
    } else {
        logOutNav.style.display = 'none';
        logInNav.style.display = 'inline';
    }
}

export { logInOutNav }