import { getCookie } from './cookies.js'
import { addToCart } from './add-to-cart.js'
import { addToStore } from './supplier-add-product.js'
import { search } from "./search.js"
import { getCategories } from './get-categories.js'
import { getProductsByCateg } from './products-by-category.js'

let categProductsDiv = document.querySelector('.category-products')
let pageTitle = document.querySelector('.page-head__title')
let categProducts = []

const serverUrl = 'https://space-k8fr.onrender.com'

let url = `${serverUrl}/products/product-by-category`

const selectedCategory = decodeURI(location.search.split("=")[1]);
console.log(selectedCategory)

pageTitle.innerHTML = selectedCategory

let noProductsDiv = document.querySelector('.categ-no-products')

fetch(`${url}/${selectedCategory}`)
    .then(res => {
        if (res.status == 200) {
            console.log(res);
            return res.json();
        }
    })
    .then(data => {
        console.log(data)
        categProducts = data.data.reverse()

        if (!categProducts.length) {
            noProductsDiv.classList.remove('hide')
        } else {
            noProductsDiv.classList.add('hide')
        }

        categProducts.map((product) => {
            let { _id, name, category, description, details, imgs } = product

            let lis, categProduct = ''

            for (let i of details) {
                lis += `<li><span>${i.title} : ${i.value}</span></li>`
            }

            let img = (imgs.length !== 0) ?
                `<img src="${imgs[0].replace('public', `${serverUrl}`)}" class="card-img-top rounded-0 product-img" alt="..."></img>`
                : `<div class="no-img">لم يتم إضافة صورة لهذا المنتج</div>`;


            let userSupplierBtn = ''
            if (getCookie('supplier_access_token')) {
                userSupplierBtn = `
                                    <button class="uk-button uk-button-large uk-width-1-1" type="button" id="addToStore" product-id="${_id}">
                                        اضف إلى متجرك<img src="./assets/img/icons/shop-solid.svg" class="me-2" alt="shop-icon">
                                    </button>
                                    <button class="uk-button uk-button-large uk-width-1-1" type="button" id="added">
                                        تم إضافة المنتج<img src="./assets/img/icons/circle-check-regular.svg" class="me-2" alt="shop-icon">
                                    </button>`
            } else {
                userSupplierBtn = `
                                    <button class="uk-button uk-button-large uk-width-1-1" type="button" id="addToCart" product-id="${_id}">
                                        اضف إلى السلة<img src="./assets/img/icons/cart-shopping-solid.svg" alt="cart-icon">
                                    </button>
                                    <div class="add-product-quantity">
                                        <button class="uk-button uk-button-large uk-width-1-1" type="submit" id="addQuantity" product-id="${_id}">اضف</button>
                                        <input type="number" class="quantity-input" min="1" value="1">
                                    </div>`
            }


            categProduct = `<div class="rental-item">
                <div class="rental-item__media">`
                + img +
                `</div>
                <div class="rental-item__desc" dir="rtl">
                    <div class="rental-item__title">${name}</div>
                    <small class="text-center" style="position:relative;top:-16px;">${category}</small>
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

            categProductsDiv.innerHTML += categProduct

            /** search */
            let searchInp = document.querySelector('.searchInp')
            searchInp.addEventListener('input', search(categProducts, categProductsDiv))
        })
    })
    .catch(err => console.log(err))


/** add-to-cart button + cart-icon-count [user] */
categProductsDiv.addEventListener('click', addToCart())

/** add-to-your-store [supplier] */
categProductsDiv.addEventListener('click', addToStore())