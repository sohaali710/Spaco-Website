import { setCookie } from './cookies.js'
import { checkEmail, checkPassword, setFormError, deleteFormError } from './form-validation.js'

const formElement = document.getElementById('log-in-form');

let emailInput = document.getElementById('email')
let passwordInput = document.getElementById('password')

let data = {};
let cookieName = 'supplier_access_token'

if (formElement) {
    formElement.addEventListener('submit', event => {
        event.preventDefault();

        checkEmail(emailInput)
        checkPassword(passwordInput)

        const formData = new FormData(formElement);
        data = Object.fromEntries(formData)

        fetch('http://localhost:5000/supplier/login', {
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
                    location.href = 'products-CRUD.html';
                }
            })
            .catch(err => console.log(err))

    })
}

