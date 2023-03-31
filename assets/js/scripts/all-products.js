import { addToCart } from './add-to-cart.js'
import { addToStore } from './supplier-add-remove-product.js'
import { getCookie } from './cookies.js'
import { getCategories } from './get-categories.js'

let allProductsDiv = document.querySelector('.all-products')
let allProducts = []

let moreDetailsBtn = document.getElementById('more-details')
let url = 'http://linkloop.co:5000/products/all'

fetch(url)
    .then(res => {
        if (res.status == 200) {
            // console.log(res);
            return res.json();
        }
    })
    .then(data => {
        // console.log(data)
        allProducts = data.data


        allProducts.map((product) => {
            let { _id, name, category, description, details, imgs } = product

            let lis, productDiv = ''

            for (let i of details) {
                lis += `<li><span>${i.title} : ${i.value}</span></li>`
            }

            let userSupplierBtn = ''
            if (getCookie('supplier_access_token')) {
                userSupplierBtn = `
                                    <button class="uk-button uk-button-large uk-width-1-1" type="button" id="addToStore" product-id="${_id}">
                                        اضف إلى متجرك<img src="./assets/img/icons/shop-solid.svg" class="me-2" alt="shop-icon">
                                    </button>`
            } else {
                userSupplierBtn = `
                                    <button class="uk-button uk-button-large uk-width-1-1" type="button" id="addToCart">
                                        اضف إلى السلة<img src="./assets/img/icons/cart-shopping-solid.svg" alt="cart-icon">
                                    </button>
                                    <div class="add-product-quantity">
                                        <button class="uk-button uk-button-large uk-width-1-1" type="submit" id="addQuantity" product-id="${_id}">اضف</button>
                                        <input type="number" class="quantity-input" min="1" value="1">
                                    </div>`
            }

            let img = (imgs.length !== 0) ?
                `<img src="${imgs[0].replace('public', 'http://linkloop.co:5000')}" class="card-img-top rounded-0 product-img" alt="..."></img>`
                : `<div class="no-img">لم يتم إضافة صورة لهذا المنتج</div>`;


            productDiv = `<div class="rental-item">
                <div class="rental-item__media">`
                + img +
                `</div>
                <div class="rental-item__desc" dir="rtl">
                    <div class="rental-item__title">${name}</div>
                    <div class="rental-item__price-delivery"> <span>تفاصيل المنتج</span></div>
                    <div class="rental-item__specifications">
                        <ul class="uk-column-1-1@s uk-column-1-2@s">`
                + lis +
                `</ul>
                    </div>
        
                    <div class="rental-item__price" dir="rtl">`
                +
                userSupplierBtn
                +
                `<a href="product-details.html?id=${_id}" class="uk-button uk-button-large uk-button-secondary" type="submit" id="more-details">
                            <span>عرض تفاصيل أكثر</span>
                        </a>
                    </div>
                </div>
            </div>`

            allProductsDiv.innerHTML += productDiv
        })
    })
    .catch(err => console.log(err))



/** add-to-cart input + cart-icon-count [user] */
let cartIconCount = document.querySelector('.cart-btn__icon')
allProductsDiv.addEventListener('click', addToCart(cartIconCount))

/** add-to-your-store input [supplier] */
allProductsDiv.addEventListener('click', addToStore())

