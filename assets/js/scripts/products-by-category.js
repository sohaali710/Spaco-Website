// render products by category in filter by category (in search section)
import { getCookie } from "./cookies.js"
import { search } from "./search.js"

let categProducts, allProducts = []
let searchInp = document.querySelector('.searchInp')

const serverUrl = 'https://space-k8fr.onrender.com'

function getProductsByCateg(productsContainer, selectedCateg = 'all-products') {
    productsContainer.innerHTML = ''

    searchInp.value = ''

    const preloader = document.querySelector('.all-products-parent #page-preloader')
    preloader.classList.toggle('hide')

    let noProductsDiv = document.querySelector('.categ-no-products')

    console.log(selectedCateg)
    if (selectedCateg === 'all-products') {
        fetch(`${serverUrl}/products/all`)
            .then(res => {
                preloader.classList.toggle('hide')

                console.log(preloader.classList)
                if (res.status == 200) {
                    // console.log(res);
                    return res.json();
                }
            })
            .then(data => {
                // console.log(data)
                allProducts = data.data.reverse()

                if (!allProducts.length) {
                    noProductsDiv.classList.remove('hide')
                } else {
                    noProductsDiv.classList.add('hide')
                }

                allProducts.map((product) => {
                    let { _id, name, category, description, details, imgs } = product

                    let productDiv, img = '';

                    let lis = ''
                    for (let i of details) {
                        lis += `<li><span>${i.title} : ${i.value}</span></li>`
                    }


                    if (getCookie('admin_access_token')) {
                        img = (imgs.length !== 0) ?
                            `<img src="${imgs[0].replace('public', serverUrl)}" class="card-img-top rounded-0 product-img" alt="..."></img>`
                            : `<div class="no-img">إضافة صورة للمنتج</div>`;


                        productDiv = `
                                <div class="col-12 col-sm-6 col-lg-4 w-auto m-auto m-x-md-0 mt-5 product-item">
                                    <div class="card text-center p-2 pb-4">
                                        <div class="add-product-img" data-bs-toggle="modal" data-bs-target="#exampleModal5" id="updateProdBtn" product-id="${_id}">`
                            + img +
                            `<div class="add-img-text">إضافة | حذف صورة</div>
                                        </div>
                                        <div class="card-body">
                                            <h4 class="card-title">${name}</h4>
                                            <small style="position:relative;top:-10px;">${category}</small>
                                            <p class="card-text fw-bold">وصف المنتج</p>
                                            <p class="card-text">${description}</p>
        
                                            <div class="mt-4 d-flex justify-content-around w-100">
                                                <button type="submit" class="btn btn-outline-dark mb-2" data-bs-toggle="modal"
                                                    data-bs-target="#exampleModal2" id="updateProdBtn" product-id="${_id}">تعديل
                                                    المنتج</button>
                                                <button type="submit" class="btn btn-outline-danger mb-2 ms-3"
                                                    data-bs-toggle="modal" data-bs-target="#exampleModal3" id="deleteProdBtn" product-id="${_id}">حذف
                                                    المنتج</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>`
                    } else {
                        img = (imgs.length !== 0) ?
                            `<img src="${imgs[0].replace('public', serverUrl)}" class="card-img-top rounded-0 product-img" alt="..."></img>`
                            : `<div class="no-img">لم يتم إضافة صورة لهذا المنتج</div>`;

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


                        productDiv = `<div class="rental-item">
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
                    }

                    productsContainer.innerHTML += productDiv

                    /** search */
                    let searchInp = document.querySelector('.searchInp')
                    searchInp.addEventListener('input', search(allProducts, productsContainer))
                })
            })
            .catch(err => console.log(err))
    } else {
        fetch(`${serverUrl}/products/product-by-category/${selectedCateg}`)
            .then(res => {
                preloader.classList.toggle('hide')
                console.log(preloader)
                if (res.status == 200) {
                    // console.log(res);
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

                    let productDiv, img = '';

                    let lis = ''
                    for (let i of details) {
                        lis += `<li><span>${i.title} : ${i.value}</span></li>`
                    }


                    if (getCookie('admin_access_token')) {
                        img = (imgs.length !== 0) ?
                            `<img src="${imgs[0].replace('public', serverUrl)}" class="card-img-top rounded-0 product-img" alt="..."></img>`
                            : `<div class="no-img">إضافة صورة للمنتج</div>`;


                        productDiv = `
                                    <div class="col-12 col-sm-6 col-lg-4 w-auto m-auto m-x-md-0 mt-5 product-item">
                                        <div class="card text-center p-2 pb-4">
                                            <div class="add-product-img" data-bs-toggle="modal" data-bs-target="#exampleModal5" id="updateProdBtn" product-id="${_id}">`
                            + img +
                            `<div class="add-img-text">إضافة | حذف صورة</div>
                                            </div>
                                            <div class="card-body">
                                                <h4 class="card-title">${name}</h4>
                                                <small style="position:relative;top:-10px;">${category}</small>
                                                <p class="card-text fw-bold">وصف المنتج</p>
                                                <p class="card-text">${description}</p>
            
                                                <div class="mt-4 d-flex justify-content-around w-100">
                                                    <button type="submit" class="btn btn-outline-dark mb-2" data-bs-toggle="modal"
                                                        data-bs-target="#exampleModal2" id="updateProdBtn" product-id="${_id}">تعديل
                                                        المنتج</button>
                                                    <button type="submit" class="btn btn-outline-danger mb-2 ms-3"
                                                        data-bs-toggle="modal" data-bs-target="#exampleModal3" id="deleteProdBtn" product-id="${_id}">حذف
                                                        المنتج</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
                    } else {
                        img = (imgs.length !== 0) ?
                            `<img src="${imgs[0].replace('public',)}" class="card-img-top rounded-0 product-img" alt="..."></img>`
                            : `<div class="no-img">لم يتم إضافة صورة لهذا المنتج</div>`;

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


                        productDiv = `<div class="rental-item">
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
                    }

                    productsContainer.innerHTML += productDiv

                    /** search */
                    let searchInp = document.querySelector('.searchInp')
                    searchInp.addEventListener('input', search(categProducts, productsContainer))
                })
            })
            .catch(err => console.log(err))
    }
}

export { getProductsByCateg }