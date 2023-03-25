import { getCookie } from './cookies.js'
import { getCategories } from './get-categories.js'
import { logInOutNav } from './log-in-out-nav.js'
import { checkName, checkCategory, checkDescription, checkDetails, checkImgs, checkCategName, checkCategImg } from './form-validation.js'

let cookieName = 'admin_access_token'

logInOutNav(cookieName)

// #region filter by categ
let filterByCategCol = document.getElementById('filterByCategCol')
if (getCookie(cookieName)) {
    getCategories(filterByCategCol)
} else {
    location.href = 'admin-log-in.html'
}
// #region all products
let allProdRow = document.querySelector('.allProdRow')
let allProdURL = 'http://linkloop.co:5000/products/all'
let allProducts = []

if (getCookie(cookieName)) {
    fetch(allProdURL)
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

                let productDiv = ''

                // let lis=''
                // for (let i of details) {
                //     lis += `<li><span>${i.title} : ${i.value}</span></li>`
                // }

                productDiv = `
                        <div class="col-12 col-sm-6 col-lg-4 w-auto m-auto m-x-md-0 mt-5">
                            <div class="card text-center p-2 pb-4">
                                <img src="${imgs[0].replace('public', 'http://linkloop.co:5000')}" class="card-img-top rounded-0" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${name}</h5>
                                    <small>${category}</small>
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
} else {
    location.href = 'admin-log-in.html'
}
// #endregion all products


// #region save input values in update
let updateForm = document.getElementById('update-product-form')
let categCol = document.querySelector('.categ-col')
let detailsRow = document.querySelector('.details-row')

let updatedProductId = ''

if (getCookie(cookieName)) {
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
                                <div class="col-12 col-sm-6 col-lg-3">
                                    <div class="custom-form-control">
                                        <label for="${d.title}" class="my-1">${d.title}</label>
                                        <input type="text" name="${d.title}" id="${d.title}" value="${d.value}" class="form-control"
                                            placeholder="${d.title}">
                                        <small></small>
                                    </div>
                                </div>`

                        // let detailsInpCol = createDetailsInp(d.title, d.value = '')
                        // console.log(d)
                        // categAndDetailsRow.appendChild(detailsInpCol)
                        detailsRow.innerHTML += dInput
                    })
                }

            });
        }
    })
} else {
    location.href = 'admin-log-in.html'
}
// #endregion


// #region update product
let detailsBtnUpdatePod = document.getElementById('updateProd-plus-btn')
let detailsNameUpdate = document.getElementById('detailsName-updateProd')

detailsBtnUpdatePod.addEventListener('click', addNewDetails(detailsRow, detailsNameUpdate))

if (getCookie(cookieName)) {
    /**on submit the update modal form .... */
    updateForm.addEventListener('submit', () => {
        event.preventDefault();

        let formData = new FormData(updateForm);

        let data = Object.fromEntries(formData)
        console.log(data)


        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('authorization', `Bearer ${getCookie(cookieName)}`);

        const options = {
            method: 'POST',
            headers: myHeaders,
            body: data
        }

        // delete options.headers['Content-Type'];

        fetch(`http://linkloop.co:5000/products/edit-prod/${updatedProductId}`, options)
            .then(res => {
                console.log(res);
                return res.json();
                // if (res.status == 200) {
                // location.href = 'products-CRUD.html';
                // }
            })
            .then(data => {
                console.log(data)
            })
            .catch(err => console.log(err))
    })
} else {
    location.href = 'admin-log-in.html'
}
// #endregion update product


// #region add new product
let addProductForm = document.getElementById('add-product-form')

let nameInput = document.getElementById('name')
let categoryInput = document.getElementById('category')
let descriptionInput = document.getElementById('description')
let imgsInput = document.getElementById('imgs')

let addProdInputsRow = document.querySelector('.addProdInputsRow')
let detailsBtnAddPod = document.getElementById('addProd-plus-btn')
// let detailsNameEnInput = document.getElementById('detailsNameEn')
let detailsNameAdd = document.getElementById('detailsName-addProd')

let addProdBtn = document.getElementById('addProdBtn')
let categColAddProd = document.querySelector('.categColAddProd')

let images = []
let bodyData = {}

let detailsArr = []

if (getCookie(cookieName)) {

    addProdBtn.addEventListener('click', () => {
        console.log(categColAddProd)
        getCategories(categColAddProd)
    })

    detailsBtnAddPod.addEventListener('click', addNewDetails(addProdInputsRow, detailsNameAdd))

    addProductForm.addEventListener('submit', event => {
        event.preventDefault();

        checkName(nameInput)
        checkCategory(categoryInput)
        checkDescription(descriptionInput)
        checkImgs(imgsInput)

        let formData = new FormData();

        formData.append('name', nameInput.value)
        formData.append('category', categoryInput.value)
        formData.append('description', descriptionInput.value)

        if (imgsInput.files[0]) {
            for (let file of imgsInput.files) {
                console.log(file)
                formData.append('imgs', file);
            }
        }

        if (detailsArr.length) {
            let newDetailsInput = ''
            for (let i in detailsArr) {
                newDetailsInput = document.getElementById(`${detailsArr[i]}`)

                checkDetails(newDetailsInput)

                // let obj = { title: detailsArr[i], value: newDetailsInput.value }

                formData.append(`details${i}["title"]`, detailsArr[i])
                formData.append(`details${i}["value"]`, newDetailsInput.value)
                // formData.append(`details${i}`, JSON.stringify(obj))
                // formData.append(`title${i}`, newDetailsInput.name)
                // formData.append(`value${i}`, newDetailsInput.value)
            }
        }


        let data = Object.fromEntries(formData)
        console.log(data)


        const myHeaders = new Headers();

        const options = {
            method: 'POST',
            headers: myHeaders,
            body: formData
        }

        delete options.headers['Content-Type'];
        myHeaders.append('authorization', `Bearer ${getCookie(cookieName)}`);

        fetch('http://linkloop.co:5000/products/add-new', options)
            .then(res => {
                console.log(res);
                return res.json();
                // if (res.status == 200) {
                // location.href = 'products-CRUD.html';
                // }
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


// #region new category
let addCategForm = document.getElementById('add-category-form')
let categoryNameInput = document.getElementById('name')
let categImgInput = document.getElementById('img')

if (getCookie(cookieName)) {
    addCategForm.addEventListener('submit', event => {
        event.preventDefault();

        let categName = categoryNameInput.value;

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
        myHeaders.append('authorization', `Bearer ${getCookie(cookieName)}`);


        fetch('http://linkloop.co:5000/admin/add-new-category', options)
            .then(res => {
                console.log(res);
                if (res.status == 200) {
                    return res.json();
                    // location.href = 'products-CRUD.html';
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
    col.classList.add("col-12", "col-md-6", "col-lg-3")

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
        // let detailsNameEn = detailsNameEnInput.value;
        let nameAr = detailsNameInput.value;

        // detailsArr[detailsNameEn] = detailsNameAr
        detailsArr.push(nameAr)

        // let detailsInput = `
        //                 <div class="col-12 col-md-6 col-lg-4">
        //                     <div class="custom-form-control">
        //                         <label for="${nameAr}" class="my-1">${nameAr}</label>
        //                         <input type="text" name="${nameAr}" id="${nameAr}" class="form-control"
        //                             placeholder="${nameAr}">
        //                         <small></small>
        //                     </div>
        //                 </div>`

        let detailsInpCol = createDetailsInp(nameAr, '')

        modalForm.appendChild(detailsInpCol);
    }
}