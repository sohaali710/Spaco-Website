import { setCookie, getCookie } from './cookies.js'

let cartProducts = []

function addToCart(cartIconCount) {
    return (e) => {
        if (e.target.matches("#addQuantity")) {
            let productId = e.target.getAttribute('product-id')
            let productQuantity = e.target.parentElement.querySelector('.quantity-input').value;

            let count = document.createElement('span')
            count.classList.add('cart-btn__count')

            if (getCookie('user-cart')) {
                cartProducts = JSON.parse(getCookie('user-cart'))

                let exist = cartProducts.find(p => p.product === productId)

                if (exist) {
                    alert('product already exists')
                } else {
                    cartProducts.push({ product: productId, quantity: productQuantity })
                    setCookie('user-cart', JSON.stringify(cartProducts))
                }

                count.textContent = cartProducts.length
                cartIconCount.append(count);
            } else {
                cartProducts.push({ product: productId, quantity: productQuantity })
                setCookie('user-cart', JSON.stringify(cartProducts))

                count.textContent = '1'
                cartIconCount.append(count);
            }

            e.target.parentElement.style.display = 'none';
            e.target.parentElement.parentElement.querySelector("#addToCart").style.display = 'inline';
            e.target.parentElement.parentElement.querySelector("img").style.display = 'inline';

        } else if (e.target.matches("#addToCart")) {
            if (getCookie('user_access_token')) {
                e.target.style.display = 'none';
                e.target.parentElement.querySelector(".add-product-quantity").style.display = 'flex';
            } else {
                //redirect to login page
                location.href = 'user-supplier-log-in.html'
            }
        }
    }
}

export { addToCart }