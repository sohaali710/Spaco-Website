import { getCookie } from './cookies.js'
import { checkName, checkCategory, checkDescription, checkDetails, checkImgs, checkCategName, checkCategImg } from './form-validation.js'
import { logInOutNav } from './log-in-out-nav.js'

let cookieName = 'admin_access_token'

let addProductForm = document.getElementById('add-product-form')

let nameInput = document.getElementById('name')
let categoryInput = document.getElementById('category')
let descriptionInput = document.getElementById('description')
let imgsInput = document.getElementById('imgs')

let prodInputsRow = document.querySelector('.prodInputsRow')
let detailsPlusBtn = document.getElementById('plus-btn')
// let detailsNameEnInput = document.getElementById('detailsNameEn')
let detailsNameArInput = document.getElementById('detailsNameAr')

let images = []
let bodyData = {}

let detailsArr = []

if (getCookie(cookieName)) {
    detailsPlusBtn.addEventListener('click', () => {
        // let detailsNameEn = detailsNameEnInput.value;
        let nameAr = detailsNameArInput.value;

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
        input.setAttribute("id", nameAr)
        input.setAttribute("placeholder", nameAr)

        const small = document.createElement('small')

        formControl.appendChild(label)
        formControl.appendChild(input)
        formControl.appendChild(small)
        col.appendChild(formControl)



        prodInputsRow.appendChild(col);
    })


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

                formData.append(`details${i}['title']`, detailsArr[i])
                formData.append(`details${i}['value']`, newDetailsInput.value)
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


/** add category */
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

logInOutNav(cookieName)