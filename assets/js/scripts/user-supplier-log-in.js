import { getCookie, setCookie, deleteCookie } from './cookies.js'
import { checkEmail, checkPassword, setFormError, deleteFormError } from './form-validation.js'

const formElement = document.getElementById('log-in-form');

let emailInput = document.getElementById('email')
let passwordInput = document.getElementById('password')

const serverUrl = 'https://space-k8fr.onrender.com'

let data = {};
let cookieName = 'user_access_token'
let userType = 'user'
let redirectTo = 'index.html'
let radioBtn = document.querySelectorAll('input[type="radio"]')

// after redirected from sign up page
if (location.search.split("=")[1]) {
    userType = location.search.split("=")[1];

    if (userType === 'user') {
        cookieName = 'user_access_token'
        redirectTo = 'index.html'
    } else if (userType === 'supplier') {
        radioBtn[1].setAttribute('checked', 'checked')
        cookieName = 'supplier_access_token'
        redirectTo = 'supplier-products.html'
    }
}
// choose the type with radio btn
for (let btn of radioBtn) {
    btn.addEventListener('click', (event) => {
        if (event.target.value === 'user') {
            cookieName = 'user_access_token'
            userType = 'user'
            redirectTo = 'index.html'
        } else if (event.target.value === 'supplier') {
            cookieName = 'supplier_access_token'
            userType = 'supplier'
            redirectTo = 'supplier-products.html'
        }
    })
}


if (getCookie('user_access_token')) {
    location.href = 'index.html'
} else if (getCookie('supplier_access_token')) {
    location.href = 'supplier-products.html'
} else {
    formElement.addEventListener('submit', event => {
        event.preventDefault();

        let checkEmailReturn = checkEmail(emailInput)
        let checkPassReturn = checkPassword(passwordInput)

        const formData = new FormData(formElement);
        data = Object.fromEntries(formData)

        if (checkEmailReturn && checkPassReturn) {
            fetch(`${serverUrl}/${userType}/login`, {
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
                        if (getCookie('admin_access_token')) {
                            deleteCookie('admin_access_token', data.token)
                        }
                        setCookie(cookieName, data.token)
                        location.href = redirectTo;
                    }
                })
                .catch(err => console.log(err))
        }
    })
}

