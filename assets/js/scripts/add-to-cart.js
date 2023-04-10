import { setCookie, getCookie } from './cookies.js'

let cartProducts = []

function addToCart() {
    return (e) => {
        let cartIconCount = document.querySelector('.cart-btn__icon')

        if (e.target.matches("#addQuantity")) {
            let productId = e.target.getAttribute('product-id')
            let productQuantity = e.target.parentElement.querySelector('.quantity-input').value;

            let count = document.createElement('span')
            count.classList.add('cart-btn__count')


            cartProducts.push({ product: productId, quantity: productQuantity })
            setCookie('user-cart', JSON.stringify(cartProducts))

            count.textContent = cartProducts.length
            cartIconCount.append(count);

            e.target.parentElement.style.display = 'none';
            e.target.parentElement.parentElement.querySelector("#addToCart").style.display = 'inline';
            e.target.parentElement.parentElement.querySelector("img").style.display = 'inline';

        } else if (e.target.matches("#addToCart")) {
            if (getCookie('user_access_token')) {
                let productId = e.target.getAttribute('product-id')

                if (getCookie('user-cart')) {
                    cartProducts = JSON.parse(getCookie('user-cart'))

                    let exist = cartProducts.find(p => p.product === productId)

                    if (exist) {
                        alert('لقد أضفت هذا المنتج من قبل')
                    } else {
                        e.target.style.display = 'none';
                        e.target.parentElement.querySelector(".add-product-quantity").style.display = 'flex';
                    }
                } else {
                    e.target.style.display = 'none';
                    e.target.parentElement.querySelector(".add-product-quantity").style.display = 'flex';
                }
            } else {
                location.href = 'user-supplier-log-in.html'
            }
        }
    }
}
export { addToCart }