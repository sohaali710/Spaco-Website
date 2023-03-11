import { setCookie } from './cookies.js'
import { checkUsername, checkEmail, checkPassword, checkConfirmPass, checkMobile, checkAddress, checkTaxes, setFormError, deleteFormError } from './form-validation.js'

const formElement = document.getElementById('sign-up-form');

let nameInput = document.getElementById('name')
let emailInput = document.getElementById('email')
let passwordInput = document.getElementById('password')
let confirmPassInput = document.getElementById('confirm-password')
let mobileInput = document.getElementById('mobile')
let taxrecordInput = document.getElementById('taxrecord')
let addressInput = document.getElementById('address')

let data = {};
let cookieName = 'supplier_access_token'

formElement.addEventListener('submit', event => {
    event.preventDefault();

    checkUsername(nameInput)
    checkEmail(emailInput)
    checkPassword(passwordInput)
    checkConfirmPass(passwordInput, confirmPassInput)
    checkMobile(mobileInput)
    checkTaxes(taxrecordInput)
    checkAddress(addressInput)

    const formData = new FormData(formElement);
    data = Object.fromEntries(formData)

    delete data['confirm-password']
    // console.log(data)

    fetch('http://localhost:5000/supplier/signup', {
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
                return res.json()
            } else {
                setFormError(formElement, emailInput, passwordInput, 'هذا البريد الإلكتروني مستخدم مسبقًا. من فضلك قم بتسجيل الدخول.')
            }
        })
        .then(data => {
            console.log(data)
            if (data) {
                setCookie(cookieName, data.token)
                location.href = 'products-CRUD.html';
            }
        })
        .catch(err => console.log(err))

})
