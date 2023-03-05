const formElement = document.getElementById('sign-up-form');

let usernameInput = document.getElementById('username')
let emailInput = document.getElementById('email')
let passwordInput = document.getElementById('password')
let confirmPassInput = document.getElementById('confirm-password')
let phoneInput = document.getElementById('phone')
let taxesInput = document.getElementById('taxes')
let addressInput = document.getElementById('address')

let data = {};
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;


formElement.addEventListener('submit', event => {
    event.preventDefault();

    checkUsername()
    checkEmail()
    checkPassword()
    checkConfirmPass()
    checkPhone()
    checkTaxes()
    checkAddress()

    const formData = new FormData(formElement);
    data = Object.fromEntries(formData)

    fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.status == 200) {
                console.log(res);
                location.href = 'index.html';
                return res.json();
            }
        })
        .then(data => console.log(data))
        .catch(err => console.log(err))

})


let checkUsername = () => {
    if (usernameInput.value === '') {
        setErrorFor(usernameInput, 'من فضلك ادخل اسمك  .')
    } else {
        setSuccessFor(usernameInput)
    }
}

let checkEmail = () => {
    if (emailInput.value === '') {
        setErrorFor(emailInput, 'من فضلك ادخل عنوان بريدك الإلكتروني.')
    }
    //  else if (emailRegex.test(emailInput.value)) {
    //     setErrorFor(emailInput, 'البريد الإلكتروني يجب أن يحتوي على علامة @ و حرفين بعدها على الأقل.')
    // } 
    else {
        setSuccessFor(emailInput)
    }
}

let checkPassword = () => {
    if (passwordInput.value === '') {
        setErrorFor(passwordInput, 'من فضلك ادخل كلمة المرور.')
    }
    // else if (passwordRegex.test(passwordInput.value)) {
    //     setErrorFor(passwordInput, 'كلمة المرور يجب أن تحتوي على أحرف و أرقام و رموز.')
    // }
    else {
        setSuccessFor(passwordInput)
    }
}

let checkConfirmPass = () => {
    if (confirmPassInput.value === '') {
        setErrorFor(confirmPassInput, 'من فضلك اعد ادخال كلمة المرور.')
    } else if (confirmPassInput.value !== passwordInput.value) {
        setErrorFor(confirmPassInput, 'كلمة المرور غير متطابقة. من فضلك اعد ادخالها مرة أخرى.')
    } else {
        setSuccessFor(confirmPassInput)
    }
}

let checkPhone = () => {
    if (phoneInput.value === '') {
        setErrorFor(phoneInput, 'من فضلك ادخل رقم الجوال.')
    } else {
        setSuccessFor(phoneInput)
    }
}

let checkTaxes = () => {
    if (taxesInput.value === '') {
        setErrorFor(taxesInput, 'من فضلك ادخل رقم السجل الضريبي .')
    } else {
        setSuccessFor(taxesInput)
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
