import { getCookie } from './cookies.js'
import { getCategories } from './get-categories.js'
import { getProductsByCateg } from './products-by-category.js'
import { checkName, checkCategory, checkDescription, checkDetails, checkImgs, checkCategName, checkCategImg } from './form-validation.js'

let adminToken = 'admin_access_token'

// #region all products
let allProdRow = document.querySelector('.allProdRow')
let allProdURL = 'http://linkloop.co:5000/products/all'
let allProducts = []

if (getCookie(adminToken)) {
    getAllProducts()
} else {
    location.href = 'admin-log-in.html'
}
// #endregion all products


// #region filter by categ
let filterByCategCol = document.getElementById('filterByCategCol')
if (getCookie(adminToken)) {
    getCategories(filterByCategCol)

    filterByCategCol.addEventListener('input', getProductsByCateg(allProdRow))
} else {
    location.href = 'admin-log-in.html'
}
// #endregion filter by categ


// #region add new product
let addProductForm = document.getElementById('add-product-form')

let nameInput = document.getElementById('name')
let descriptionInput = document.getElementById('description')

let addProdInputsRow = document.querySelector('.addProdInputsRow')
let detailsBtnAddPod = document.getElementById('addProd-plus-btn')
let detailsNameAdd = document.getElementById('detailsName-addProd')

let addProdBtn = document.getElementById('addProdBtn')
let categColAddProd = document.querySelector('.categColAddProd')

let detailsArr = []

if (getCookie(adminToken)) {
    addProdBtn.addEventListener('click', () => getCategories(categColAddProd))

    detailsBtnAddPod.addEventListener('click', addNewDetails(addProdInputsRow, detailsNameAdd))


    addProductForm.addEventListener('submit', event => {
        event.preventDefault();

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
                newDetailsInput = document.getElementById(`${i}`)
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


        fetch('http://linkloop.co:5000/products/add-new', options)
            .then(res => {
                console.log(res);
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


        fetch(`http://linkloop.co:5000/products/product-by-id/${updatedProductId}`).then(res => res.json()).then(data => {
            let { name, category, description, details } = data.data

            updateForm.querySelector('#name').value = name
            updateForm.querySelector('#description').value = description

            getCategories(categCol, category)

            detailsRow.innerHTML = ''

            if (details.length) {
                details.forEach((d) => {
                    let dInput = `
                                <div class="col-12 col-sm-6 col-lg-4">
                                    <div class="custom-form-control">
                                        <label for="${d.title}" class="my-1">${d.title}</label>
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


updateForm.addEventListener('submit', () => {
    event.preventDefault();

    let formData = new FormData(updateForm);

    let data = Object.fromEntries(formData)
    console.log(data)
    let { name, category, description, ...d } = data

    let details = []
    if (Object.keys(d)) {
        let newDetailsInput = ''

        for (let i in d) {
            newDetailsInput = document.getElementById(`${i}`)
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


    fetch(`http://linkloop.co:5000/products/edit-prod/${updatedProductId}`, options)
        .then(res => {
            console.log(res);
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


// #region upload imgs
let prodImgForm = document.getElementById('product-img-form')
let imgsInput = document.getElementById('imgs')
let productImgs = document.querySelector('.productImgs')
let removeImgBtn = document.querySelector('.btn-close')

if (getCookie(adminToken)) {
    let productId = ''

    allProdRow.addEventListener('click', (e) => {
        console.log(e.target.matches('.product-img') || e.target.matches('.add-img-text') || e.target.matches('.no-img'))
        if (e.target.matches('.product-img') || e.target.matches('.add-img-text') || e.target.matches('.no-img')) {
            productId = e.target.parentElement.getAttribute('product-id')
            console.log(productId)

            getProductImgs(productId)
        }
    })

    imgsInput.addEventListener('change', event => {
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

        fetch(`http://linkloop.co:5000/products/add-img/${productId}`, options)
            .then(res => {
                console.log(res);
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

            let imgSrc = e.target.parentElement.children[0].getAttribute('src');
            img = imgSrc.replace('http://linkloop.co:5000', 'public')
            console.log(img)
        }

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('authorization', `Bearer ${getCookie(adminToken)}`);

        const options = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({ img })
        }


        fetch(`http://linkloop.co:5000/products/remove-img/${productId}`, options)
            .then(res => {
                console.log(res);
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

} else {
    location.href = 'admin-log-in.html'
}
//#endregion remove img


// #region new category
let addCategForm = document.getElementById('add-category-form')
let categoryNameInput = document.getElementById('name')
let categImgInput = document.getElementById('img')

if (getCookie(adminToken)) {
    addCategForm.addEventListener('submit', event => {
        event.preventDefault();

        let categName = categoryNameInput.value.trim();

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


        fetch('http://linkloop.co:5000/admin/add-new-category', options)
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



/**create details input */
let createDetailsInp = (nameAr, val) => {
    const col = document.createElement('div')
    col.classList.add("col-12", "col-md-6", "col-lg-4")

    const formControl = document.createElement('div')
    formControl.classList.add("custom-form-control")

    const label = document.createElement('label')
    label.classList.add("my-1")
    label.textContent = nameAr

    const input = document.createElement('input')
    input.classList.add("form-control")
    input.setAttribute("name", nameAr)
    input.setAttribute("value", val)
    input.setAttribute("id", nameAr)
    input.setAttribute("placeholder", nameAr)

    const small = document.createElement('small')

    formControl.appendChild(label)
    formControl.appendChild(input)
    formControl.appendChild(small)
    col.appendChild(formControl)

    return col
}

/**add new details input [in add-product & update-product]*/
function addNewDetails(modalForm, detailsNameInput) {
    return () => {
        let nameAr = detailsNameInput.value;

        detailsArr.push(nameAr)

        let detailsInpCol = createDetailsInp(nameAr, '')
        modalForm.appendChild(detailsInpCol);
    }
}

/** rendering all product */
function getAllProducts() {
    allProdRow.innerHTML = ''

    fetch(allProdURL)
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

                let productDiv = ''

                // let lis=''
                // for (let i of details) {
                //     lis += `<li><span>${i.title} : ${i.value}</span></li>`
                // }

                let img = (imgs.length !== 0) ?
                    `<img src="${imgs[0].replace('public', 'http://linkloop.co:5000')}" class="card-img-top rounded-0 product-img" alt="..."></img>`
                    : `<div class="no-img">إضافة صورة للمنتج</div>`;

                // <img src="${img}" class="card-img-top rounded-0 product-img" alt="...">
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
                                            data-bs-toggle="modal" data-bs-target="#exampleModal3">حذف
                                            المنتج</button>
                                    </div>
                                </div>
                            </div>
                        </div>`

                allProdRow.innerHTML += productDiv
            })
        })
        .catch(err => console.log(err))
}


/** rendering product imgs */
function getProductImgs(productId) {
    fetch(`http://linkloop.co:5000/products/product-by-id/${productId}`).then(res => res.json()).then(data => {
        let { imgs } = data.data

        productImgs.innerHTML = ''
        if (imgs.length) {
            imgs.forEach((img) => {
                img = img.replace('public', 'http://linkloop.co:5000')

                let imgDiv = `
                                <div class="col-12 col-sm-6 col-lg-4">
                                    <div class="custom-form-control">
                                        <img src="${img}" alt="product image">
                                        <button type="button" class="btn-close mt-2 me-2" product-id="${productId}" aria-label="Close"></button>
                                    </div>
                                </div>`

                productImgs.innerHTML += imgDiv
            })
        }

    });
}