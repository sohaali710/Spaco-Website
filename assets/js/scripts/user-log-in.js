const formElement = document.getElementById('log-in-form');

let emailInput = document.getElementById('email')
let passwordInput = document.getElementById('password')

let data = {};
const emailRegex = /^(?=[^@]{4,}@)([\w\.-]*[a-zA-Z0-9_]@(?=.{4,}\.[^.]*$)[\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z])$/;
const passwordRegex = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*)$/;
// const passwordRegex = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/;


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
        setErrorFor(passwordInput, 'كلمة المرور يجب ألا تقل عن 8 أحرف و تحتوي على حروف إنجليزية كبيرة و صغيرة و أرقام .')
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