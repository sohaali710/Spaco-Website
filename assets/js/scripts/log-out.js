import { getCookie, deleteCookie } from "./cookies.js";
import { logInOutNav } from "./log-in-out-nav.js";

let logOutBtn = document.getElementById('log-out')

let userToken = 'user_access_token'
let supplierToken = 'supplier_access_token'
let adminToken = 'admin_access_token'

let redirectTo = ''

if (getCookie(userToken)) {
    logInOutNav(userToken)
} else if (getCookie(supplierToken)) {
    logInOutNav(supplierToken)
} else if (getCookie(adminToken)) {
    logInOutNav(adminToken)
}

logOutBtn.addEventListener('click', event => {
    if (getCookie(userToken)) {
        deleteCookie(userToken)
        location.href = 'user-supplier-log-in.html'
    } else if (getCookie(supplierToken)) {
        deleteCookie(supplierToken)
        location.href = 'user-supplier-log-in.html'
    } else if (getCookie(adminToken)) {
        deleteCookie(adminToken)
        location.href = 'admin-log-in.html'
    }
})