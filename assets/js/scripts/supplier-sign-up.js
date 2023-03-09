const formElement = document.getElementById('sign-up-form');

let nameInput = document.getElementById('name')
let emailInput = document.getElementById('email')
let passwordInput = document.getElementById('password')
let confirmPassInput = document.getElementById('confirm-password')
let mobileInput = document.getElementById('mobile')
let taxrecordInput = document.getElementById('taxrecord')
let addressInput = document.getElementById('address')

let data = {};
const emailRegex = /^(?=[^@]{4,}@)([\w\.-]*[a-zA-Z0-9_]@(?=.{4,}\.[^.]*$)[\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z])$/;
const passwordRegex = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/;


formElement.addEventListener('submit', event => {
    event.preventDefault();

    checkUsername()
    checkEmail()
    checkPassword()
    // checkConfirmPass()
    checkMobile()
    checkTaxes()
    checkAddress()

    const formData = new FormData(formElement);
    data = Object.fromEntries(formData)

    fetch('http://localhost:5000/supplier/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            console.log(res.status == 200, res.status)
            if (res.status == 200) {
                console.log(res);
                location.href = 'products-CRUD.html';
                return res.json();
            }
        })
        .then(data => console.log(data))
        .catch(err => console.log(err))

})


let checkUsername = () => {
    if (nameInput.value === '') {
        setErrorFor(nameInput, 'من فضلك ادخل اسمك  .')
    } else {
        setSuccessFor(nameInput)
    }
}

let checkEmail = () => {
    if (emailInput.value === '') {
        setErrorFor(emailInput, 'من فضلك ادخل عنوان بريدك الإلكتروني.')
    } else if (emailRegex.test(emailInput.value)) {
        setErrorFor(emailInput, 'البريد الإلكتروني يجب أن يحتوي على علامة @ و حرفين بعدها على الأقل.')
    } else {
        setSuccessFor(emailInput)
    }
}

let checkPassword = () => {
    if (passwordInput.value === '') {
        setErrorFor(passwordInput, 'من فضلك ادخل كلمة المرور.')
    } else if (passwordRegex.test(passwordInput.value)) {
        setErrorFor(passwordInput, 'كلمة المرور يجب ألا تقل عن 8 أحرف و تحتوي على الأقل على حرف إنجليزي كبير و حرف صغير و رقم و رمز .')
    } else {
        setSuccessFor(passwordInput)
    }
}

// let checkConfirmPass = () => {
//     if (confirmPassInput.value === '') {
//         setErrorFor(confirmPassInput, 'من فضلك اعد ادخال كلمة المرور.')
//     } else if (confirmPassInput.value !== passwordInput.value) {
//         setErrorFor(confirmPassInput, 'كلمة المرور غير متطابقة. من فضلك اعد ادخالها مرة أخرى.')
//     } else {
//         setSuccessFor(confirmPassInput)
//     }
// }

let checkMobile = () => {
    if (mobileInput.value === '') {
        setErrorFor(mobileInput, 'من فضلك ادخل رقم الجوال.')
    } else {
        setSuccessFor(mobileInput)
    }
}

let checkTaxes = () => {
    if (taxrecordInput.value === '') {
        setErrorFor(taxrecordInput, 'من فضلك ادخل السجل الضريبي .')
    } else {
        setSuccessFor(taxrecordInput)
    }
}

let checkAddress = () => {
    if (addressInput.value === '') {
        setErrorFor(addressInput, 'من فضلك ادخل العنوان .')
    } else {
        setSuccessFor(addressInput)
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
