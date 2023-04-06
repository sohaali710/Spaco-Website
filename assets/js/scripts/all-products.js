import { addToCart } from './add-to-cart.js'
import { addToStore } from './supplier-add-product.js'
import { getCookie } from './cookies.js'
import { getCategories } from './get-categories.js'
import { getProductsByCateg } from './products-by-category.js'
import { search } from './search.js'

let allProductsDiv = document.querySelector('.all-products')
let allProducts = []

let moreDetailsBtn = document.getElementById('more-details')
let url = 'http://linkloop.co:5000/products/all'

const userToken = 'user_access_token'
const supplierToken = 'supplier_access_token'

if (getCookie('user_access_token') || getCookie('supplier_access_token')) {
    getAllProd()
} else if (getCookie('admin_access_token')) {
    location.href = 'admin-control-panel.html'
}

function getAllProd() {
    // allProductsDiv.innerHTML = ''
    fetch(url)
        .then(res => {
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

                let lis, productDiv = ''

                for (let i of details) {
                    lis += `<li><span>${i.title} : ${i.value}</span></li>`
                }

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


/** add-to-cart input + cart-icon-count [user] */
let cartIconCount = document.querySelector('.cart-btn__icon')
allProductsDiv.addEventListener('click', addToCart(cartIconCount))

/** add-to-your-store input [supplier] */
allProductsDiv.addEventListener('click', (e) => {
    if (e.target.matches("#addToStore")) {
        let productId = e.target.getAttribute('product-id')

        const myHeaders = new Headers();
        myHeaders.append('authorization', `Bearer ${getCookie(supplierToken)}`);

        const options = {
            method: 'GET',
            headers: myHeaders
        }

        fetch('http://linkloop.co:5000/supplier/all-products', options)
            .then(res => { if (res.status == 200) return res.json() })
            .then(data => {
                if (data) {
                    const supplierProducts = data.products

                    if (supplierProducts.length !== 0) {
                        console.log(supplierProducts)
                        supplierProducts.forEach((product) => {
                            if (product._id === productId) {
                                alert('لقد أضفت هذا المنتج إلى متجرك من قبل.')
                            } else {
                                addToStore(productId)

                                let addToStoreBtn = e.target
                                let addedBtn = e.target.parentElement.children[1]

                                addedBtn.style.display = 'inline'
                                addToStoreBtn.style.display = 'none'
                                setTimeout(() => {
                                    addedBtn.style.display = 'none'
                                    addToStoreBtn.style.display = 'inline'
                                }, 1500);
                            }
                        })
                    } else {
                        addToStore(productId)

                        let addToStoreBtn = e.target
                        let addedBtn = e.target.parentElement.children[1]

                        addedBtn.style.display = 'inline'
                        addToStoreBtn.style.display = 'none'
                        setTimeout(() => {
                            addedBtn.style.display = 'none'
                            addToStoreBtn.style.display = 'inline'
                        }, 1500);
                    }
                }
            })

    }
    if (e.target.matches("#added")) {
        alert('لقد أضفت هذا المنتج إلى متجرك من قبل.')
    }
})

/** added to store or not */
// isAddedToStore()
// function isAddedToStore() {
//     let addToStoreBtn = document.querySelectorAll('#addToStore')
//     let addedBtn = document.querySelectorAll('#added')

//     console.log(addToStoreBtn)

//     const myHeaders = new Headers();
//     myHeaders.append('authorization', `Bearer ${getCookie(supplierToken)}`);

//     const options = {
//         method: 'GET',
//         headers: myHeaders
//     }

//     fetch('http://linkloop.co:5000/supplier/all-products', options)
//         .then(res => { if (res.status == 200) return res.json() })
//         .then(data => {
//             if (data) {
//                 const supplierProducts = data.products

//                 console.log(supplierProducts)
//                 if (supplierProducts.length !== 0) {
//                     console.log(supplierProducts)
//                     supplierProducts.forEach((product) => {
//                         addedBtn.style.display = 'inline'
//                         addToStoreBtn.style.display = 'none'
//                     })
//                 }
//             }
//         })
// }