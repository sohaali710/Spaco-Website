/** in index(home) & categories-1 pages */
/** + in admin update category */

import { getCookie } from "./cookies.js"

// user
const categoriesContainer = document.querySelector('.categories-container')

// admin
const categoriesTable = document.querySelector('.categTable')
let categoryItem = ''

const serverUrl = 'https://space-k8fr.onrender.com'

function getCategPage() {
    fetch(`${serverUrl}/products/categs`).then(res => res.json()).then(data => {
        const categories = data.data


        if (getCookie("admin_access_token")) {
            categoriesTable.innerHTML = ''

            categories.forEach((categ => {
                const { _id, name, img } = categ

                // if (getCookie("admin_access_token")) {
                categoriesTable.innerHTML += `
        <tr>
                                <td>${name}</td>
                                <td>
                                    <img src="${img.replace('public', 'http://linkloop.co:5000')}" class="updateCategImg" alt="category image"
                                    categ-id="${_id}"></img>
                                </td>
                                <td>
                                    <div class="removeUpdateCategContainer">
                                        <svg data-bs-toggle="modal" data-bs-target="#exampleModalToggle3"
                                        categ-id="${_id}"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill="#777" class="edit-svg"
                                                d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                                        </svg>

                                        <button type="button" id="removeDetailsBtn" class="btn-close"
                                            aria-label="Close" data-bs-toggle="modal"
                                            data-bs-target="#exampleModalToggle4" categ-id="${_id}"></button>
                                    </div>
                                </td>
                            </tr>`
            }))
        } else {
            categoriesContainer.innerHTML = ''

            categories.forEach((categ => {
                const { _id, name, img } = categ

                categoriesContainer.innerHTML += `
        <div class= "categ-item">
        <div class="category-item">
            <a class="category-item__link uk-inline-clip uk-transition-toggle"
                href="page-category-products.html?category=${name}" tabindex="0">
                <div class="category-item__media">
                    <img src="${img.replace('public', 'http://linkloop.co:5000')}" class="card-img-top rounded-0 product-img" alt="..."></img>
                    <div class="uk-transition-fade">
                        <div class="uk-overlay-primary uk-position-cover"></div>
                        <div class="uk-position-center"><span
                            data-uk-icon="icon: plus; ratio: 2"></span></div>
                    </div>
                </div>
                <div class="category-item__title"> <span>${name}</span></div>
            </a>
        </div>
                            </div> `
            }))
        }
    })
}

getCategPage()

export { getCategPage }