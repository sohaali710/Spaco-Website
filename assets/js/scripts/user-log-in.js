const formElement = document.getElementById('log-in-form');

let emailInput = document.getElementById('email')
let passwordInput = document.getElementById('password')

let data = {};
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;


formElement.addEventListener('submit', event => {
    event.preventDefault();

    checkEmail()
    checkPassword()

    const formData = new FormData(formElement);
    data = Object.fromEntries(formData)

    fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            setFormError()
            if (res.status == 200) {
                console.log(res);
                location.href = 'index.html';
                return res.json();
            }
        })
        .then(data => console.log(data))
        .catch(err => console.log(err))

})


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
        setErrorFor(passwordInput, 'كلمة المرور يجب أن تحتوي على أحرف و أرقام و رموز.')
    } else {
        setSuccessFor(passwordInput)
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

let setFormError = () => {
    if (emailInput.parentElement.classList.contains('success') && passwordInput.parentElement.classList.contains('success')) {
        const formErrorMsg = formElement.querySelector('.formErrorMsg')
        formErrorMsg.innerText = 'هذا البريد الإلكتروني غير موجود. من فضلك ادخل بريد إلكتروني صحيح أو قم بإنشاء حساب جديد.'

        formElement.className = "error"

        emailInput.parentElement.className = "custom-form-control error"
        passwordInput.parentElement.className = "custom-form-control error"
        emailInput.parentElement.querySelector('small').innerHTML = ''
        passwordInput.parentElement.querySelector('small').innerHTML = ''

    }
}