import { getCookie } from './cookies.js'
import { checkName, checkCategory, checkDescription, checkDetails, checkImgs, checkCategName, checkCategImg, deleteFormInputsError } from './form-validation.js'
import { getCategories } from './get-categories.js'
import { getCategPage } from './page-categories.js'
import { getProductsByCateg } from './products-by-category.js'
import { search } from './search.js'

let adminToken = 'admin_access_token'
let loading = false

const serverUrl = 'https://space-k8fr.onrender.com'

// #region all products
let allProdRow = document.querySelector('.allProdRow')
let allProdURL = `${serverUrl}/products/all`
let allProducts = []

if (getCookie(adminToken)) {
    getAllProducts()
} else {
    location.href = 'admin-log-in.html'
}
// #endregion all products


// #region add new product
let addProductForm = document.getElementById('add-product-form')

let nameInput = document.getElementById('name')
let descriptionInput = document.getElementById('description')

let addProdInputsRow = document.querySelector('.addProdInputsRow')
let detailsBtnAddPod = document.getElementById('addProd-plus-btn')
let detailsNameAdd = document.getElementById('detailsName-addProd')

let addProdBtn = document.getElementById('addProdBtn')
let categColAddProd = document.querySelector('.categColAddProd')


if (getCookie(adminToken)) {
    addProdBtn.addEventListener('click', () => getCategories(categColAddProd))

    detailsBtnAddPod.addEventListener('click', addNewDetails(addProdInputsRow, detailsNameAdd))
    addProdInputsRow.addEventListener('click', removeDetails())

    addProdBtn.addEventListener('click', () => {
        addProductForm.reset()
        deleteFormInputsError(addProductForm)

        detailsNameAdd.value = ''

        let detailsInp = addProductForm.querySelector('.detailsInp')
        if (detailsInp) {
            detailsInp.remove()
        }
    })



    addProductForm.addEventListener('submit', event => {
        event.preventDefault();

        const preloader = document.querySelector('.all-products-parent #page-preloader')
        preloader.classList.toggle('hide')

        checkName(nameInput)
        checkDescription(descriptionInput)

        let categoryInput = document.querySelector('.categColAddProd #category')
        checkCategory(categoryInput)
        // checkImgs(imgsInput)

        let formData = new FormData(addProductForm);

        let data = Object.fromEntries(formData)
        // console.log(data)
        let { name, category, description, ...d } = data


        let details = []
        if (Object.keys(d)) {
            let newDetailsInput = ''

            for (let i in d) {
                newDetailsInput = document.getElementById(i)
                checkDetails(newDetailsInput)

                let obj = { title: i, value: d[i] }
                details.push(obj)
            }
        }


        let bodyData = { name, category, description }
        if (details.length) { bodyData['details'] = details }

        console.log(bodyData)

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('authorization', `Bearer ${getCookie(adminToken)}`);

        const options = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(bodyData)
        }


        fetch(`${serverUrl}/products/add-new`, options)
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

    })
} else {
    location.href = 'admin-log-in.html'
}
// #endregion add new product


// #region save input values in update
let updateForm = document.getElementById('update-product-form')
let categCol = document.querySelector('.categ-col')
let detailsRow = document.querySelector('.details-row')

let updatedProductId = ''

allProdRow.addEventListener('click', (e) => {
    if (e.target.matches('#updateProdBtn')) {
        updatedProductId = e.target.getAttribute('product-id')

        fetch(`${serverUrl}/products/product-by-id/${updatedProductId}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                let { name, category, description, details } = data.data

                updateForm.querySelector('#name').value = name
                updateForm.querySelector('#description').value = description

                getCategories(categCol, category)

                detailsRow.innerHTML = ''

                if (details.length) {
                    details.forEach((d) => {
                        let dInput = `
        <div class= "col-12 col-sm-6 col-lg-4 detailsInp">
        <div class="custom-form-control">
            <label for="${d.title}" class="my-1">${d.title}</label>
            <button type="button" id="removeDetailsBtn" class="btn-close" aria-label="Close"></button>
            <input type="text" name="${d.title}" id="${d.title}" value="${d.value}" class="form-control"
                placeholder="${d.title}">
                <small></small>
        </div>
        </div>`

                        detailsRow.innerHTML += dInput
                    })
                }

            });
    }
})
// #endregion


// #region update product
let detailsBtnUpdatePod = document.getElementById('updateProd-plus-btn')
let detailsNameUpdate = document.getElementById('detailsName-updateProd')

detailsBtnUpdatePod.addEventListener('click', addNewDetails(detailsRow, detailsNameUpdate))
detailsRow.addEventListener('click', removeDetails())

updateForm.addEventListener('submit', () => {
    event.preventDefault();

    const preloader = document.querySelector('.all-products-parent #page-preloader')
    preloader.classList.toggle('hide')

    let formData = new FormData(updateForm);

    let data = Object.fromEntries(formData)
    console.log(data)
    let { name, category, description, ...d } = data

    let details = []
    if (Object.keys(d)) {
        let newDetailsInput = ''

        for (let i in d) {
            newDetailsInput = document.getElementById(i)
            checkDetails(newDetailsInput)

            let obj = { title: i, value: d[i] }
            details.push(obj)
        }
    }

    let bodyData = { name, category, description }
    if (details.length) { bodyData['details'] = details }

    console.log(bodyData)


    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('authorization', `Bearer ${getCookie(adminToken)}`);

    const options = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(bodyData)
    }


    fetch(`${serverUrl}/products/edit-prod/${updatedProductId}`, options)
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
})
// #endregion update product



// #region delete product
const confirmDelete = document.getElementById('confirmDelete')

if (getCookie(adminToken)) {
    let productId = ''

    allProdRow.addEventListener('click', (e) => {
        if (e.target.matches('#deleteProdBtn')) {
            productId = e.target.getAttribute('product-id')

            confirmDelete.addEventListener('click', () => {
                const preloader = document.querySelector('.all-products-parent #page-preloader')
                preloader.classList.toggle('hide')

                const myHeaders = new Headers();
                myHeaders.append('authorization', `Bearer ${getCookie(adminToken)}`);

                const options = {
                    method: 'GET',
                    headers: myHeaders
                }


                fetch(`${serverUrl}/products/remove-prod/${productId}`, options)
                    .then(res => {
                        console.log(res);
                        preloader.classList.toggle('hide')

                        if (res.status === 200) {
                            const selectedCateg = document.getElementById('category').value
                            console.log(selectedCateg)
                            getProductsByCateg(allProdRow, selectedCateg)

                            return res.json();
                        }
                    })
                    .then(data => {
                        console.log(data)
                    })
                    .catch(err => console.log(err))

            })
        }

    })

} else {
    location.href = 'admin-log-in.html'
}
// #endregion delete product


// #region upload imgs
let prodImgForm = document.getElementById('product-img-form')
let imgsInput = document.getElementById('imgs')
let productImgs = document.querySelector('.productImgs')
let removeImgBtn = document.querySelector('.btn-close')

if (getCookie(adminToken)) {
    let productId = ''

    allProdRow.addEventListener('click', (e) => {
        if (e.target.matches('.product-img') || e.target.matches('.add-img-text') || e.target.matches('.no-img')) {
            productId = e.target.parentElement.getAttribute('product-id')

            getProductImgs(productId)

            imgsInput.addEventListener('change', event => {
                const preloader = document.querySelector('.fetchDataLoader #page-preloader')
                preloader.classList.toggle('hide')

                let formData = new FormData(prodImgForm);

                let data = Object.fromEntries(formData)

                const myHeaders = new Headers();

                const options = {
                    method: 'POST',
                    headers: myHeaders,
                    body: formData
                }

                delete options.headers['Content-Type'];
                myHeaders.append('authorization', `Bearer ${getCookie(adminToken)}`);

                fetch(`${serverUrl}/products/add-img/${productId}`, options)
                    .then(res => {
                        console.log(res);
                        preloader.classList.toggle('hide')

                        if (res.status === 200) {
                            getProductImgs(productId)
                            getAllProducts()

                            return res.json();
                        }
                    })
                    .then(data => {
                        console.log(data)
                    })
                    .catch(err => console.log(err))

            })
        }
    })

} else {
    location.href = 'admin-log-in.html'
}
// #endregion upload imgs

//#region remove img
if (getCookie(adminToken)) {
    let productId = ''
    let img = ''

    productImgs.addEventListener('click', (e) => {
        if (e.target.matches('.btn-close')) {
            productId = e.target.getAttribute('product-id')

            const preloader = document.querySelector('.fetchDataLoader #page-preloader')
            preloader.classList.toggle('hide')

            let imgSrc = e.target.parentElement.children[0].getAttribute('src');
            img = imgSrc.replace(serverUrl, 'public')
            console.log(img)

            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('authorization', `Bearer ${getCookie(adminToken)}`);

            const options = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({ img })
            }


            fetch(`${serverUrl}/products/remove-img/${productId}`, options)
                .then(res => {
                    console.log(res);
                    preloader.classList.toggle('hide')

                    if (res.status === 200) {
                        getProductImgs(productId)
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

} else {
    location.href = 'admin-log-in.html'
}
//#endregion remove img


// #region new category
let addCategForm = document.getElementById('add-category-form')
let categoryNameInput = document.querySelector('#add-category-form #name')
let categImgInput = document.querySelector('#add-category-form #img')

let filterByCategCol = document.getElementById('category')

if (getCookie(adminToken)) {
    addCategForm.addEventListener('submit', event => {
        event.preventDefault();

        checkCategName(categoryNameInput)
        checkCategImg(categImgInput)


        let formData = new FormData(addCategForm);

        const myHeaders = new Headers();

        const options = {
            method: 'POST',
            headers: myHeaders,
            body: formData
        }

        delete options.headers['Content-Type'];
        myHeaders.append('authorization', `Bearer ${getCookie(adminToken)}`);


        fetch(`${serverUrl}/admin/add-new-category`, options)
            .then(res => {
                console.log(res);
                if (res.status == 200) {
                    getCategories(filterByCategCol)
                    return res.json();
                }
            })
            .then(data => console.log(data))
            .catch(err => console.log(err))

    })
} else {
    location.href = 'admin-log-in.html'
}
// #endregion new category

// #region Update category
let updateCategForm = document.getElementById('update-category-form')
let updateCategoryName = document.getElementById('update-category-name')
let updateCategImg = document.getElementById('update-category-img')

let categTable = document.querySelector('.categTable')

if (getCookie(adminToken)) {
    let categId = ''
    categTable.addEventListener('click', (e) => {
        if (e.target.matches('.removeUpdateCategContainer svg')) {
            categId = e.target.getAttribute('categ-id')


            updateCategForm.addEventListener('submit', event => {
                event.preventDefault();

                checkCategName(updateCategoryName)
                checkCategImg(updateCategImg)

                let formData = new FormData(updateCategForm);

                let data = Object.fromEntries(formData)
                console.log(data)

                const myHeaders = new Headers();

                const options = {
                    method: 'POST',
                    headers: myHeaders,
                    body: formData
                }

                delete options.headers['Content-Type'];
                myHeaders.append('authorization', `Bearer ${getCookie(adminToken)}`);

                fetch(`${serverUrl}/products/edit-categ/${categId}`, options)
                    .then(res => {
                        console.log(res);
                        if (res.status == 200) {
                            // getCategories(filterByCategCol)
                            return res.json();
                        }
                    })
                    .then(data => console.log(data))
                    .catch(err => console.log(err))



                // const preloader = document.querySelector('.fetchDataLoader #page-preloader')
                // preloader.classList.toggle('hide')

                // let formData2 = new FormData();
                // formData2.append('img', updateCategImg.files[0])

                // checkCategImg(updateCategImg)

                // let data2 = Object.fromEntries(formData2)

                // const myHeaders2 = new Headers();

                // const options2 = {
                //     method: 'POST',
                //     headers: myHeaders2,
                //     body: formData2
                // }

                // delete options2.headers['Content-Type'];
                // myHeaders2.append('authorization', `Bearer ${ getCookie(adminToken) }`);

                // fetch(`${serverUrl}/products/edit-categ/${categId}`, options2)
                //     .then(res => {
                //         console.log(res);
                //         preloader.classList.toggle('hide')

                //         if (res.status === 200) {
                //             // getProductImgs(productId)
                //             getCategories(categColAddProd)

                //             return res.json();
                //         }
                //     })
                //     .then(data => {
                //         console.log(data)
                //     })
                //     .catch(err => console.log(err))

            })
        }
    })

} else {
    location.href = 'admin-log-in.html'
}


// upload category img
// if (getCookie(adminToken)) {
//     categTable.addEventListener('click', (e) => {
//         if (e.target.matches('img')) {
//             let categId = e.target.getAttribute('categ-id')
//             console.log(categId)
//             // getProductImgs(categId)

//             // imgsInput.addEventListener('change', event => {
//             //     const preloader = document.querySelector('.fetchDataLoader #page-preloader')
//             //     preloader.classList.toggle('hide')

//             //     let formData = new FormData(prodImgForm);

//             //     let data = Object.fromEntries(formData)

//             //     const myHeaders = new Headers();

//             //     const options = {
//             //         method: 'POST',
//             //         headers: myHeaders,
//             //         body: formData
//             //     }

//             //     delete options.headers['Content-Type'];
//             //     myHeaders.append('authorization', `Bearer ${ getCookie(adminToken) }`);

//             //     fetch(`${serverUrl}/products/edit-categ/${categId}`, options)
//             //         .then(res => {
//             //             console.log(res);
//             //             preloader.classList.toggle('hide')

//             //             if (res.status === 200) {
//             //                 // getProductImgs(productId)
//             //                 getCategories(categColAddProd)

//             //                 return res.json();
//             //             }
//             //         })
//             //         .then(data => {
//             //             console.log(data)
//             //         })
//             //         .catch(err => console.log(err))

//             // })
//         }
//     })

// } else {
//     location.href = 'admin-log-in.html'
// }

// #endregion Update category

// #region  remove category
const confirmDeleteCateg = document.getElementById('confirmDeleteCateg')

if (getCookie(adminToken)) {
    let categId = ''

    categTable.addEventListener('click', (e) => {
        if (e.target.matches('.removeUpdateCategContainer .btn-close')) {
            categId = e.target.getAttribute('categ-id')
            console.log(categId)

            confirmDeleteCateg.addEventListener('click', () => {
                const preloader = document.querySelector('.all-products-parent #page-preloader')
                preloader.classList.toggle('hide')

                const myHeaders = new Headers();
                myHeaders.append('authorization', `Bearer ${getCookie(adminToken)}`);

                const options = {
                    method: 'GET',
                    headers: myHeaders
                }

                fetch(`${serverUrl}/products/remove-categ/${categId}`, options)
                    .then(res => {
                        console.log(res);
                        preloader.classList.toggle('hide')

                        if (res.status === 200) {
                            getCategPage()
                            return res.json();
                        }
                    })
                    .then(data => {
                        console.log(data)
                    })
                    .catch(err => console.log(err))

            })


        }
    })

} else {
    location.href = 'admin-log-in.html'
}
// #endregion remove category



/**create details input */
let createDetailsInp = (nameAr, val) => {
    const col = document.createElement('div')
    col.classList.add("col-12", "col-md-6", "col-lg-4", "detailsInp")

    const formControl = document.createElement('div')
    formControl.classList.add("custom-form-control")

    const label = document.createElement('label')
    label.classList.add("my-1")
    label.textContent = nameAr

    const button = document.createElement('button')
    button.classList.add("btn-close")
    button.setAttribute("type", "button")
    button.setAttribute("id", "removeDetailsBtn")
    button.setAttribute("aria-label", "Close")

    const input = document.createElement('input')
    input.classList.add("form-control")
    input.setAttribute("name", nameAr)
    input.setAttribute("value", val)
    input.setAttribute("id", nameAr)
    input.setAttribute("placeholder", nameAr)

    const small = document.createElement('small')

    formControl.appendChild(label)
    formControl.appendChild(button)
    formControl.appendChild(input)
    formControl.appendChild(small)
    col.appendChild(formControl)

    return col
}

/**add new details input [in add-product & update-product]*/
function addNewDetails(modalForm, detailsNameInput) {
    return () => {
        let nameAr = detailsNameInput.value;

        let detailsInpCol = createDetailsInp(nameAr, '')

        if (!detailsInpCol.querySelector('label').innerHTML) {
            detailsInpCol.querySelector('label').innerHTML = '&ThinSpace;'
        }

        modalForm.appendChild(detailsInpCol);

        detailsNameInput.value = ''
    }
}

function removeDetails() {
    return (e) => {
        if (e.target.matches('#removeDetailsBtn')) {
            const detailsInpToRemove = e.target.parentElement.parentElement
            console.log(detailsInpToRemove)

            detailsInpToRemove.remove()
        }
    }
}



/** rendering all product */
function getAllProducts() {
    allProdRow.innerHTML = ''

    const preloader = document.querySelector('.all-products-parent #page-preloader')
    preloader.classList.toggle('hide')

    fetch(allProdURL)
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

            allProducts.map((product) => {
                let { _id, name, category, description, details, imgs } = product

                let productDiv = ''

                // let lis=''
                // for (let i of details) {
                //     lis += `<li> <span>${i.title} : ${i.value}</span></li> `
                // }

                let img = (imgs.length !== 0) ?
                    `<img src = "${imgs[0].replace('public', serverUrl)}" class= "card-img-top rounded-0 product-img" alt = "..." ></img>`
                    : `<div class= "no-img" > إضافة صورة للمنتج</div> `;

                // <img src="${img}" class="card-img-top rounded-0 product-img" alt="...">
                productDiv = `
        <div class= "col-12 col-sm-6 col-lg-4 w-auto m-auto m-x-md-0 mt-5 product-item">
        <div class="card text-center p-2 pb-4">
            <div class="add-product-img" data-bs-toggle="modal" data-bs-target="#exampleModal5" product-id="${_id}">`
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
                        </div> `

                allProdRow.innerHTML += productDiv

                /** search */
                let searchInp = document.querySelector('.searchInp')
                searchInp.addEventListener('input', search(allProducts, allProdRow))
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
        getProductsByCateg(allProdRow, selectedCateg, loading)
    }
})

/** rendering product imgs */
function getProductImgs(productId) {
    fetch(`${serverUrl}/products/product-by-id/${productId}`).then(res => res.json()).then(data => {
        let { imgs } = data.data

        productImgs.innerHTML = ''
        if (imgs.length) {
            imgs.forEach((img) => {
                img = img.replace('public', serverUrl)

                let imgDiv = `
                    <div class= "col-12 col-sm-6 col-lg-4">
                    <div class="custom-form-control">
                        <img src="${img}" alt="product image">
                            <button type="button" class="btn-close mt-2 me-2" product-id="${productId}" aria-label="Close"></button>
                    </div>
                                </div> `

                productImgs.innerHTML += imgDiv
            })
        }

    });
}