/**categories & cart */

import { getCookie, setCookie } from "./cookies.js"

let cartIcon = document.querySelector('.cart-btn')
let cartIconCount = document.querySelector('.cart-btn__icon')

let cartProducts = []

// number of products in cart on cartIcon
if (getCookie('user_access_token')) {
    let count = document.createElement('span')
    count.classList.add('cart-btn__count')

    if (getCookie('user-cart')) {
        cartProducts = JSON.parse(getCookie('user-cart'))

        count.textContent = cartProducts.length
        cartIconCount.append(count);
    } else {
        count.textContent = '0'
        cartIconCount.append(count);
    }
}


cartIcon.addEventListener('click', () => {
    if (getCookie('user_access_token')) {
        if (getCookie('user-cart')) {
            this.parentElement.setAttribute('href', 'user-cart.html')
        } else {
            alert('cart is empty')
        }
    } else {
        location.href = 'user-supplier-log-in.html'
    }
})