let addProductForm = document.getElementById('add-product-form')

let nameInput = document.getElementById('name')
let categoryInput = document.getElementById('category')
let descriptionInput = document.getElementById('description')
let detailsInput = document.getElementById('details')
let imgsInput = document.getElementById('imgs')

let images = []
let bodyData = {}

let cookieName = 'supplier_access_token'

addProductForm.addEventListener('submit', event => {
    event.preventDefault();

    checkName()
    checkCategory()
    checkDescription()
    checkDetails()
    checkImgs()

    let formData = new FormData(addProductForm);


    if (imgsInput.files.length > 0) {
        for (const file of imgsInput.files) {
            formData.append('files', file, file.name);
        }
    }

    let data = Object.fromEntries(formData)

    let { name, category, description, imgs, files, ...details } = data;

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
    // console.log(`Bearer ${getTokenCookie(cookieName)}`)
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('authorization', `Bearer ${getTokenCookie(cookieName)}`);

    fetch('http://localhost:5000/products/add-new', {
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


let checkName = () => {
    if (nameInput.value === '') {
        setErrorFor(nameInput, 'ادخل اسم المنتج .')
    } else {
        setSuccessFor(nameInput)
    }
}
let checkCategory = () => {
    if (categoryInput.value === '') {
        setErrorFor(categoryInput, 'ادخل القسم الخاص بالمنتج .')
    } else {
        setSuccessFor(categoryInput)
    }
}
let checkDescription = () => {
    if (descriptionInput.value === '') {
        setErrorFor(descriptionInput, 'ادخل وصف المنتج .')
    } else {
        setSuccessFor(descriptionInput)
    }
}
let checkDetails = () => {
    if (detailsInput.value === '') {
        setErrorFor(detailsInput, 'ادخل وصف المنتج .')
    } else {
        setSuccessFor(detailsInput)
    }
}
let checkImgs = () => {
    if (imgsInput.value === '') {
        setErrorFor(imgsInput, 'ادخل صور المنتج .')
    } else {
        setSuccessFor(imgsInput)
    }
}


let setSuccessFor = (input) => {
    const formControl = input.parentElement

    formControl.className = "custom-form-control success"
}
let setErrorFor = (input, msg) => {
    const formControl = input.parentElement
    const small = formControl.querySelector('small')

    small.innerText = msg

    formControl.className = "custom-form-control error"
}

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


/* log-in | log-out nav */
if (getTokenCookie(cookieName)) {
    let logOutNav = document.getElementById('log-out')
    let logInNav = document.getElementById('log-in')

    logOutNav.style.display = 'inline';
    logInNav.style.display = 'none';
}


/**handling cookie */
function getAllCookies() {
    var allCookies = [];
    var keyValCookies = document.cookie.split(";");

    if (keyValCookies[0]) {
        for (var i = 0; i < keyValCookies.length; i++) {
            allCookies[keyValCookies[i].split("=")[0].trim()] = keyValCookies[i].split("=")[1].trim();
        }

        return allCookies;
    }
}
function getTokenCookie(cookieName) {
    var all = getAllCookies();

    for (let i in all) {
        if (i == cookieName) {
            return all[i];
        }
    }
}