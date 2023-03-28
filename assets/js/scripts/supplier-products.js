import { getCookie } from './cookies.js'
import { logInOutNav } from './log-in-out-nav.js'

let supplierToken = 'supplier_access_token'

logInOutNav(supplierToken)

if (getCookie(supplierToken)) {

} else {
    location.href = `user-supplier-log-in.html?user-type=supplier`
}