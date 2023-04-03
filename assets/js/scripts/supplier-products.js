import { getCookie } from './cookies.js'

let supplierToken = 'supplier_access_token'

if (getCookie(supplierToken)) {

} else {
    location.href = `user-supplier-log-in.html?user-type=supplier`
}

// let removeBtn = `
//                 <button class="uk-button uk-button-large uk-width-1-1" type="button" id="removeFromStore" product-id="${_id}">
//                 حذف من متجرك<img src="./assets/img/icons/shop-solid.svg" class="me-2" alt="shop-icon">
//                 </button>`