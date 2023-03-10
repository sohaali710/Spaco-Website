let addProductForm = document.getElementById('add-product-form')

let nameInput = document.getElementById('name')
let categoryInput = document.getElementById('category')
let descriptionInput = document.getElementById('description')
let detailsInput = document.getElementById('details')
let imgsInput = document.getElementById('imgs')

let formData = []
let data = {}
let images = []

addProductForm.addEventListener('submit', event => {
    event.preventDefault();

    checkName()
    checkCategory()
    checkDescription()
    checkDetails()
    checkImgs()

    formData = new FormData(addProductForm);
    data = Object.fromEntries(formData)
    data.imgs = images

    let { name, category, description, ...details } = data;
    // console.log(details)

    let d = []
    for (let i in details) {
        d.push({ title: i, value: details[i] })
    }
    data.details = d

    console.log(data)


    let bodyData = {
        name, category, description,
        details: d
    }

    console.log(bodyData)

    const myHeaders = new Headers();
    console.log(document.cookie.split('=')[1])
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('authorization', document.cookie.split('=')[1].trim());

    fetch('http://localhost:5000/products/add-new', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(bodyData)
    })
        .then(res => {
            if (res.status == 200) {
                console.log(res);
                // location.href = 'products-CRUD.html';
                return res.json();
            }
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
// let files = []
// function selectMultipleFiles(event) {
//     console.log(event.target.files)
//     files = event.target.files
//     if (event.target.files.length > 0) {
//         for (let i = 0; i < event.target.files.length; i++) {
//         files[i] = event.target.files[i]
//         formData.append("files", files.files[i]);
//         formData.append("files", event.target.files[i]);
//         }
//     }
// }