import { getCookie } from './cookies.js'
import { checkCategName, checkCategImg } from './form-validation.js'
import { logInOutNav } from './log-in-out-nav.js'

let cookieName = 'admin_access_token'

let addCategForm = document.getElementById('add-category-form')
let categoryNameInput = document.getElementById('name')
let categImgInput = document.getElementById('img')



// addCategBtn.addEventListener('click', () => {


//     let detailsInput = `
//                     <div class="col-12 col-md-6 col-lg-4">
//                         <div class="custom-form-control">
//                             <label for="" class="my-1">${categName}</label>
//                             <input type="text" name="details${counter}" id="details${counter}" class="form-control"
//                                 placeholder="${categName}">
//                             <small></small>
//                         </div>
//                     </div>`

//     prodInputsRow.innerHTML += detailsInput;
// })

let counter = 0
let detailsArr = []

addCategForm.addEventListener('submit', event => {
    event.preventDefault();

    counter++;
    let categName = categoryNameInput.value;

    detailsArr.push(categName)


    checkCategName(categoryNameInput)
    checkCategImg(categImgInput)


    let formData = new FormData(addCategForm);
    // formData.append('name', categName);

    // if (categImgInput.files.length > 0) {
    // formData.append('file', categImgInput.files[0]);
    //     formData.append('img', categImgInput.files[0]);
    // }

    let data = Object.fromEntries(formData)

    console.log(data)


    const myHeaders = new Headers();
    // console.log(`Bearer ${getCookie(cookieName)}`)
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('authorization', `Bearer ${getCookie(cookieName)}`);

    fetch('http://linkloop.co:5000/admin/add-new-category', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data)
    })
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


logInOutNav(cookieName)

