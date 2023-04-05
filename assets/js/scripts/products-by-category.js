import { getCookie } from "./cookies.js"
import { search } from "./search.js"

let categProducts, allProducts = []

function getProductsByCateg(productsContainer, selectedCateg) {
    productsContainer.innerHTML = ''

    console.log(selectedCateg)
    if (selectedCateg === 'all-products') {
        fetch(`http://linkloop.co:5000/products/all`)
            .then(res => {
                if (res.status == 200) {
                    // console.log(res);
                    return res.json();
                }
            })
            .then(data => {
                // console.log(data)
                allProducts = data.data.reverse()

                allProducts.map((product) => {
                    let { _id, name, category, description, details, imgs } = product

                    let productDiv, img = '';

                    let lis = ''
                    for (let i of details) {
                        lis += `<li><span>${i.title} : ${i.value}</span></li>`
                    }


                    if (getCookie('admin_access_token')) {
                        img = (imgs.length !== 0) ?
                            `<img src="${imgs[0].replace('public', 'http://linkloop.co:5000')}" class="card-img-top rounded-0 product-img" alt="..."></img>`
                            : `<div class="no-img">إضافة صورة للمنتج</div>`;


                        productDiv = `
                                <div class="col-12 col-sm-6 col-lg-4 w-auto m-auto m-x-md-0 mt-5">
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
                    } else if (getCookie('user_access_token') || getCookie('supplier_access_token')) {
                        img = (imgs.length !== 0) ?
                            `<img src="${imgs[0].replace('public', 'http://linkloop.co:5000')}" class="card-img-top rounded-0 product-img" alt="..."></img>`
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
        fetch(`http://linkloop.co:5000/products/product-by-category/${selectedCateg}`)
            .then(res => {
                if (res.status == 200) {
                    // console.log(res);
                    return res.json();
                }
            })
            .then(data => {
                console.log(data)
                categProducts = data.data.reverse()

                categProducts.map((product) => {
                    let { _id, name, category, description, details, imgs } = product

                    let productDiv, img = '';

                    let lis = ''
                    for (let i of details) {
                        lis += `<li><span>${i.title} : ${i.value}</span></li>`
                    }


                    if (getCookie('admin_access_token') && !getCookie('user_access_token') && !getCookie('supplier_access_token')) {
                        img = (imgs.length !== 0) ?
                            `<img src="${imgs[0].replace('public', 'http://linkloop.co:5000')}" class="card-img-top rounded-0 product-img" alt="..."></img>`
                            : `<div class="no-img">إضافة صورة للمنتج</div>`;


                        productDiv = `
                                    <div class="col-12 col-sm-6 col-lg-4 w-auto m-auto m-x-md-0 mt-5">
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
                    } else if (getCookie('user_access_token') || getCookie('supplier_access_token')) {
                        img = (imgs.length !== 0) ?
                            `<img src="${imgs[0].replace('public', 'http://linkloop.co:5000')}" class="card-img-top rounded-0 product-img" alt="..."></img>`
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
                    if (getCookie('user_access_token') || getCookie('supplier_access_token')) {
                        let searchInp = document.querySelector('.searchInp')
                        searchInp.addEventListener('input', search(categProducts, productsContainer))
                    }
                })
            })
            .catch(err => console.log(err))
    }
}

export { getProductsByCateg }