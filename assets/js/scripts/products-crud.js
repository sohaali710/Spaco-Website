import { getCookie } from './cookies.js'
import { checkName, checkCategory, checkDescription, checkDetails, checkImgs } from './form-validation.js'
import { logInOutNav } from './log-in-out-nav.js'

let addProductForm = document.getElementById('add-product-form')

let nameInput = document.getElementById('name')
let categoryInput = document.getElementById('category')
let descriptionInput = document.getElementById('description')
let imgsInput = document.getElementById('imgs')

let prodInputsRow = document.querySelector('.prodInputsRow')
let detailsPlusBtn = document.getElementById('plus-btn')
let detailsNameInput = document.getElementById('detailsName')

let images = []
let bodyData = {}

let cookieName = 'supplier_access_token'


let detailsArr = []
detailsPlusBtn.addEventListener('click', () => {
    let inputName = detailsNameInput.value;

    detailsArr.push(inputName)

    let detailsInput = `
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="custom-form-control">
                            <label for="" class="my-1">${inputName}</label>
                            <input type="text" name="${inputName}" id="${inputName}" class="form-control"
                                placeholder="${inputName}">
                            <small></small>
                        </div>
                    </div>`

    prodInputsRow.innerHTML += detailsInput;
})

addProductForm.addEventListener('submit', event => {
    event.preventDefault();

    checkName(nameInput)
    checkCategory(categoryInput)
    checkDescription(descriptionInput)
    checkImgs(imgsInput)

    if (detailsArr.length) {
        for (let i of detailsArr) {
            checkDetails(document.getElementById(`${i}`))
        }
    }

    let formData = new FormData(addProductForm);


    if (imgsInput.files.length > 0) {
        for (const file of imgsInput.files) {
            formData.append('files', file, file.name);
        }
    }

    let data = Object.fromEntries(formData)

    let { name, category, description, imgs, files, detailsName, ...details } = data;

    let d = []
    for (let i in details) {
        d.push({ title: i, value: details[i] })
    }
    data.details = d

    // console.log(data)

    bodyData = {
        name, category, description,
        files,
        details: d
    }

    console.log(bodyData)

    const myHeaders = new Headers();
    // console.log(`Bearer ${getCookie(cookieName)}`)
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('authorization', `Bearer ${getCookie(cookieName)}`);

    fetch('http://linkloop.co:5000/products/add-new', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(bodyData)
    })
        .then(res => {
            console.log(res);
            return res.json();
            // if (res.status == 200) {
            // location.href = 'products-CRUD.html';
            // }
        })
        .then(data => console.log(data))
        .catch(err => console.log(err))

})



// upload img
// function selectMultipleFiles(event) {
//     console.log(event.target.files)
//     if (event.target.files.length > 0) {
//         for (let i = 0; i < event.target.files.length; i++) {
//             // files[i] = event.target.files[i]
//             // formData.append("files", event.target.files[i]);
//             // formData.append("files", event.target.files[i]);

//             bodyData.append('files[]', file, event.target.files[i].name)
//         }
//     }
// }

logInOutNav(cookieName)
