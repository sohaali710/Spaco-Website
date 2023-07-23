import { addToCart } from './add-to-cart.js'
import { addToStore } from './supplier-add-product.js'
import { getCookie } from './cookies.js'
import { getCategories } from './get-categories.js'
import { getProductsByCateg } from './products-by-category.js'
import { search } from './search.js'

let allProductsDiv = document.querySelector('.all-products')
let allProducts = []

const serverUrl = 'https://space-k8fr.onrender.com'

let moreDetailsBtn = document.getElementById('more-details')
let url = `${serverUrl}/products/all`

const userToken = 'user_access_token'
const supplierToken = 'supplier_access_token'

if (getCookie('admin_access_token')) {
    location.href = 'admin-control-panel.html'
} else {
    getAllProd()
}

function getAllProd() {
    // allProductsDiv.innerHTML = ''
    const preloader = document.querySelector('.all-products-parent #page-preloader')
    preloader.classList.toggle('hide')

    fetch(url)
        .then(res => {
            preloader.classList.toggle('hide')

            if (res.status == 200) {
                // console.log(res);
                return res.json();
            }
        })
        .then(data => {
            // console.log(data)
            allProducts = data.data.reverse()


            allProducts.forEach((product) => {
                let { _id, name, category, description, details, imgs } = product

                let productDiv = ''
                // let lis = ''

                // for (let i of details) {
                //     lis += `<li><span>${i.title} : ${i.value}</span></li>`
                // }

                //     <ul class="uk-column-1-1@s uk-column-1-2@s">
                // + lis +
                // </ul>

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

                let img = (imgs.length !== 0) ?
                    `<img src="${imgs[0].replace('public', `${serverUrl}`)}" class="card-img-top rounded-0 product-img" alt="..."></img>`
                    : `<div class="no-img">لم يتم إضافة صورة لهذا المنتج</div>`;


                productDiv = `<div class="rental-item">
                <div class="rental-item__media">`
                    + img +
                    `</div>
                <div class="rental-item__desc" dir="rtl">
                    <div class="rental-item__title">${name}</div>
                    <small class="text-center" style="position:relative;top:-16px;">${category}</small>
                    <div class="rental-item__price-delivery"> <span>وصف المنتج</span></div>
                    <div class="rental-item__specifications">
                        ${description}
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

                /** search */
                let searchInp = document.querySelector('.searchInp')
                searchInp.addEventListener('input', search(allProducts, allProductsDiv))
            })
        })
        .catch(err => console.log(err))
}

/** get categories names in search section */
const categContainer = document.getElementById('category')
getCategories(categContainer)
/** and render categ products */
categContainer.addEventListener('input', (e) => {
    if (e.target.matches('select') && e.target.value) {
        let selectedCateg = e.target.value
        getProductsByCateg(allProductsDiv, selectedCateg)
    }
})


/** add-to-cart button + cart-icon-count [user] */
allProductsDiv.addEventListener('click', addToCart())

/** add-to-your-store [supplier] */
allProductsDiv.addEventListener('click', addToStore())
