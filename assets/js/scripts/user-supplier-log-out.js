import { getCookie, deleteCookie } from "./cookies.js";
import { logInOutNav } from "./log-in-out-nav.js";

let logOutBtn = document.getElementById('log-out')

let userToken = 'user_access_token'
let supplierToken = 'supplier_access_token'

let redirectTo = 'user-supplier-log-in.html'

if (getCookie(userToken)) {
    logInOutNav(userToken)
} else if (getCookie(supplierToken)) {
    logInOutNav(supplierToken)
}

logOutBtn.addEventListener('click', event => {
    if (getCookie(userToken)) {
        deleteCookie(userToken)
    } else if (getCookie(supplierToken)) {
        deleteCookie(supplierToken)
    }
    location.href = redirectTo
})