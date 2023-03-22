import { setCookie, getCookie, deleteCookie } from './cookies.js'

let cartProdAmount = document.querySelector('.uk-h2')
let productsTable = document.querySelector('table')
let productsTbody = document.querySelector('table tbody')
let displayPriceBtn = document.querySelector('#display-price')

let cartIconCount = document.querySelector('.cart-btn__icon')


const url = ''
let cartProducts = []

if (getCookie('user-cart')) {
    cartProducts = JSON.parse(getCookie('user-cart'))

    cartProducts.forEach((prod) => {
        const { product: productId, quantity } = prod

        fetch(`http://linkloop.co:5000/products/product-by-id/${productId}`).then(res => res.json()).then(data => {
            console.log(data.data)
            const { name, imgs } = data.data
            const img = imgs[0].replace('public', 'http://linkloop.co:5000')

            let row = `
                    <tr>
                        <td class="ps-4 w-auto">
                            <img src="${img}" alt="">
                        </td>
                        <td>${name}</td>
                        <td>
                            <button type="button" class="btn-close mt-2 me-2" product-id="${productId}"
                                style="position:relative;right:-35%;top:-25px;" aria-label="Close"></button>
                            ${quantity}
                        </td>
                    </tr>`

            productsTbody.innerHTML += row
            cartProdAmount.innerHTML = `${cartProducts.length} منتج في سلة المشتريات`
        })
    })
} else {
    productsTable.style.display = 'none'
    displayPriceBtn.style.display = 'none'

    cartProdAmount.innerHTML = `سلة المشتريات فارغة. الذهاب إلى<a href="index.html"> الصفحة الرئيسية</a>`
}


productsTbody.addEventListener('click', (e) => {
    if (e.target.matches(".btn-close")) {
        let productId = e.target.getAttribute('product-id')
        let prodRow = e.target.parentElement.parentElement


        cartProducts.forEach((prod, index) => {
            if (prod.product === productId) {
                cartProducts.splice(index, 1)
                prodRow.remove();
                setCookie('user-cart', JSON.stringify(cartProducts))
            }
        })
        cartProdAmount.innerHTML = `${cartProducts.length} منتج في سلة المشتريات`

        let count = document.createElement('span')
        count.classList.add('cart-btn__count')

        count.textContent = cartProducts.length
        cartIconCount.append(count);

        if (cartProducts.length == 0) {
            productsTable.style.display = 'none'
            cartProdAmount.innerHTML = `سلة المشتريات فارغة. الذهاب إلى<a href="index.html"> الصفحة الرئيسية</a>`

            displayPriceBtn.style.display = 'none'

            deleteCookie('user-cart')
        }

    }
})

