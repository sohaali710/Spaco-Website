import { setCookie } from './cookies.js'
import { checkUsername, checkEmail, checkPassword, checkConfirmPass, checkMobile, checkAddress, checkTaxes, setFormError, deleteFormError, removeCheckTaxes } from './form-validation.js'

const formElement = document.getElementById('sign-up-form');

let nameInput = document.getElementById('name')
let emailInput = document.getElementById('email')
let passwordInput = document.getElementById('password')
let confirmPassInput = document.getElementById('confirm-password')
let mobileInput = document.getElementById('mobile')
let taxrecordInput = document.getElementById('taxrecord')
let addressInput = document.getElementById('address')

let data = {};
let cookieName = 'user_access_token'
let userType = 'user'
let radioBtn = document.querySelectorAll('input[type="radio"]')


for (let btn of radioBtn) {
    btn.addEventListener('click', (event) => {
        if (event.target.value === 'user') {
            removeCheckTaxes(taxrecordInput)
            taxrecordInput.style.display = 'none'
            taxrecordInput.parentElement.style.paddingBottom = 0;
            cookieName = 'user_access_token'
            userType = 'user'
        } else if (event.target.value === 'supplier') {
            taxrecordInput.style.display = 'inline'
            taxrecordInput.parentElement.style.paddingBottom = '24px';
            cookieName = 'supplier_access_token'
            userType = 'supplier'
        }
    })
}


formElement.addEventListener('submit', event => {
    event.preventDefault();

    checkUsername(nameInput)
    checkEmail(emailInput)
    checkPassword(passwordInput)
    checkConfirmPass(passwordInput, confirmPassInput)
    checkMobile(mobileInput)
    checkAddress(addressInput)

    const formData = new FormData(formElement);
    data = Object.fromEntries(formData)

    if (userType === 'user') {
        delete data['taxrecord']
    } else if (userType === 'supplier') {
        checkTaxes(taxrecordInput)
    }
    delete data['confirm-password']
    console.log(data)

    fetch(`http://localhost:5000/${userType}/signup`, {
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
