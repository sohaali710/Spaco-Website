import { getCookie, setCookie, deleteCookie } from './cookies.js'
import { checkEmail, checkPassword, setFormError, deleteFormError } from './form-validation.js'

const formElement = document.getElementById('log-in-form');

let emailInput = document.getElementById('email')
let passwordInput = document.getElementById('password')

let data = {};
let adminToken = 'admin_access_token'
let redirectTo = 'admin-control-panel.html'


if (getCookie(adminToken)) {
    location.href = redirectTo
} else {
    formElement.addEventListener('submit', event => {
        event.preventDefault();

        let checkEmailReturn = checkEmail(emailInput)
        let checkPassReturn = checkPassword(passwordInput)

        const formData = new FormData(formElement);
        data = Object.fromEntries(formData)


        // if (checkEmailReturn && checkPassReturn) {
        if (checkEmailReturn) {
            fetch(`http://linkloop.co:5000/admin/login`, {
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
                        setFormError(formElement, emailInput, passwordInput, 'هذا البريد الإلكتروني أو كلمة المرور غير صحيحة. من فضلك ادخل بريد إلكتروني و كلمة مرور صحيحتين.')
                    }
                })
                .then(data => {
                    if (data) {
                        console.log(data)
                        if (getCookie('user_access_token')) {
                            deleteCookie('user_access_token', data.token)
                        } else if (getCookie('supplier_access_token')) {
                            deleteCookie('supplier_access_token', data.token)
                        }
                        setCookie(adminToken, data.token)
                        location.href = redirectTo;
                    }
                })
                .catch(err => console.log(err))
        }

    })
}

