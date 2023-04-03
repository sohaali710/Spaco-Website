import { getCookie } from './cookies.js'

let supplierToken = 'supplier_access_token'

if (getCookie(supplierToken)) {

} else {
    location.href = `user-supplier-log-in.html?user-type=supplier`
}