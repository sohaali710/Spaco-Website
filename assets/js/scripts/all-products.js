import { addToCart } from './add-to-cart.js'

let allProductsDiv = document.querySelector('.all-products')
let allProducts = []

let moreDetailsBtn = document.getElementById('more-details')
let url = 'http://linkloop.co:5000/products/all'

fetch(url)
    .then(res => {
        if (res.status == 200) {
            console.log(res);
            return res.json();
        }
    })
    .then(data => {
        console.log(data)
        allProducts = data.data


        allProducts.map((product) => {
            let { _id, name, category, description, details, imgs } = product

            let lis, productDiv = ''

            for (let i of details) {
                lis += `<li><span>${i.title} : ${i.value}</span></li>`
            }

            productDiv = `<div class="rental-item">
                <div class="rental-item__media"> <img src="${imgs[0].replace('public', 'http://linkloop.co:5000')}" alt="Standard Excavator"></div>
                <div class="rental-item__desc" dir="rtl">
                    <div class="rental-item__title">${name}</div>
                    <div class="rental-item__price-delivery"> <span>تفاصيل المنتج</span></div>
                    <div class="rental-item__specifications">
                        <ul class="uk-column-1-1@s uk-column-1-2@s">`
                + lis +
                `</ul>
                    </div>
        
                    <div class="rental-item__price" dir="rtl">
                        <button class="uk-button uk-button-large uk-width-1-1" type="button" id="addToCart">
                            اضف إلى السلة<img src="./assets/img/icons/cart-shopping-solid.svg" alt="cart-icon">
                        </button>
                        <div class="add-product-quantity">
                            <button class="uk-button uk-button-large uk-width-1-1" type="submit" id="addQuantity" product-id="${_id}">اضف</button>
                            <input type="number" class="quantity-input" min="1" value="1">
                        </div>
                        
                        <a href="product-details.html?id=${_id}" class="uk-button uk-button-large uk-button-secondary" type="submit" id="more-details">
                            <span>عرض تفاصيل أكثر</span>
                        </a>
                    </div>
                </div>
            </div>`

            allProductsDiv.innerHTML += productDiv
        })
    })
    .catch(err => console.log(err))



/** add-to-cart input + cart-icon-count */
let cartIconCount = document.querySelector('.cart-btn__icon')

allProductsDiv.addEventListener('click', addToCart(cartIconCount))
