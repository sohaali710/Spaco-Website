import { setCookie } from './cookies.js'
import { checkEmail, checkPassword, setFormError, deleteFormError } from './form-validation.js'

const formElement = document.getElementById('log-in-form');

let emailInput = document.getElementById('email')
let passwordInput = document.getElementById('password')

let data = {};
let cookieName = 'user_access_token'
let userType = 'user'
let redirectTo = 'index.html'
let radioBtn = document.querySelectorAll('input[type="radio"]')

for (let btn of radioBtn) {
    btn.addEventListener('click', (event) => {
        if (event.target.value === 'user') {
            cookieName = 'user_access_token'
            userType = 'user'
            redirectTo = 'index.html'
        } else if (event.target.value === 'supplier') {
            cookieName = 'supplier_access_token'
            userType = 'supplier'
            redirectTo = 'products-CRUD.html'
        }
    })
}



if (formElement) {
    formElement.addEventListener('submit', event => {
        event.preventDefault();

        let checkEmailReturn = checkEmail(emailInput)
        let checkPassReturn = checkPassword(passwordInput)

        const formData = new FormData(formElement);
        data = Object.fromEntries(formData)

        if (checkEmailReturn && checkPassReturn) {
            fetch(`http://linkloop.co:5000/${userType}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        deleteFormError(formElement)
                        return res.json();
                    } else {
                        setFormError(formElement, emailInput, passwordInput, 'هذا البريد الإلكتروني أو كلمة المرور غير صحيحة. من فضلك ادخل بريد إلكتروني و كلمة مرور صحيحتين أو قم بإنشاء حساب جديد.')
                    }
                })
                .then(data => {
                    if (data) {
                        console.log(data)
                        setCookie(cookieName, data.token)
                        location.href = redirectTo;
                    }
                })
                .catch(err => console.log(err))
        }
    })
}

