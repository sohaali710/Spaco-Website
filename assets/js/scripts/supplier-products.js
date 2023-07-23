import { getCookie } from './cookies.js'
import { getCategories } from './get-categories.js'
import { getProductsByCateg } from './products-by-category.js'
import { search } from './search.js'

const serverUrl = 'https://space-k8fr.onrender.com'

const supplierToken = 'supplier_access_token'
const url = `${serverUrl}/supplier/all-products`

let allProductsDiv = document.querySelector('.supplier-all-products')
let allProducts = []

let moreDetailsBtn = document.getElementById('more-details')

if (getCookie(supplierToken)) {
    getAllProducts()
} else {
    location.href = `user-supplier-log-in.html?user-type=supplier`
}


/** supplier all products */
const searchSection = document.querySelector('.page-head__form')

function getAllProducts() {
    allProductsDiv.innerHTML = ''

    const myHeaders = new Headers();
    myHeaders.append('authorization', `Bearer ${getCookie(supplierToken)}`);

    const options = {
        method: 'GET',
        headers: myHeaders
    }
    fetch(url, options)
        .then(res => {
            console.log(res);
            if (res.status == 200) {
                return res.json();
            }
        })
        .then(data => {
            console.log(data)
            if (data) {
                allProducts = data.products

                if (allProducts.length == 0) {
                    searchSection.style.display = 'none'
                    allProductsDiv.innerHTML = `<div class="no-products"><span>لا يوجد منتجات في متجرك. انتقل إلى  </span><a href="page-products-list.html">صفحة المنتحات </a><span>لإضافة المنتجات إلى متجرك</span></div>`
                }

                allProducts.map((product) => {
                    let { _id, name, category, description, details, imgs } = product

                    let lis, productDiv = ''

                    for (let i of details) {
                        lis += `<li><span>${i.title} : ${i.value}</span></li>`
                    }

                    let removeProdBtn = `
                                <button class="uk-button uk-button-large uk-width-1-1" type="button" id="removeFromStore" product-id="${_id}"
                                style="background-color: #C20300;">
                                حذف من متجرك<img src="./assets/img/icons/shop-solid.svg" class="me-2" alt="shop-icon">
                                </button>`

                    let img = (imgs.length !== 0) ?
                        `<img src="${imgs[0].replace('public', serverUrl)}" class="card-img-top rounded-0 product-img" alt="..."></img>`
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
                        removeProdBtn
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
            }
        })
        .catch(err => console.log(err))
}

/** from supplier store page */
allProductsDiv.addEventListener('click', (e) => {
    console.log(e.target)
    if (e.target.matches("#removeFromStore")) {
        let productId = e.target.getAttribute('product-id')

        const preloader = document.querySelector('.all-products-parent #page-preloader')
        preloader.classList.toggle('hide')

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('authorization', `Bearer ${getCookie(supplierToken)}`);

        const options = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({ id: productId })
        }

        fetch('http://linkloop.co:5000/supplier/remove-prod', options)
            .then(res => {
                console.log(res);
                preloader.classList.toggle('hide')

                if (res.status == 200) {
                    getAllProducts()
                    return res.json();
                }
            })
            .then(data => {
                console.log(data)
            })
            .catch(err => console.log(err))
    }
})