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
let userType = 'user'
let radioBtn = document.querySelectorAll('input[type="radio"]')


for (let btn of radioBtn) {
    btn.addEventListener('click', (event) => {
        if (event.target.value === 'user') {
            removeCheckTaxes(taxrecordInput)
            taxrecordInput.style.display = 'none'
            taxrecordInput.parentElement.style.paddingBottom = 0;
            userType = 'user'
        } else if (event.target.value === 'supplier') {
            taxrecordInput.style.display = 'inline'
            taxrecordInput.parentElement.style.paddingBottom = '24px';
            userType = 'supplier'
        }
    })
}


formElement.addEventListener('submit', event => {
    event.preventDefault();

    let checkNameReturn = checkUsername(nameInput)
    let checkEmailReturn = checkEmail(emailInput)
    let checkPassReturn = checkPassword(passwordInput)
    let checkConfirmPassReturn = checkConfirmPass(passwordInput, confirmPassInput)
    let checkMobileReturn = checkMobile(mobileInput)
    let checkAddressReturn = checkAddress(addressInput)

    const formData = new FormData(formElement);
    data = Object.fromEntries(formData)

    let taxesFlag = true
    if (userType === 'user') {
        delete data['taxrecord']
    } else if (userType === 'supplier') {
        let checkTaxesReturn = checkTaxes(taxrecordInput)
        if (!checkTaxesReturn) {
            taxesFlag = false
        }
    }
    delete data['confirm-password']
    console.log(data)

    if (checkNameReturn && checkEmailReturn && checkPassReturn && checkConfirmPassReturn && checkMobileReturn && checkAddressReturn) {
        if (taxesFlag) {
            fetch(`http://linkloop.co:5000/${userType}/signup`, {
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
                        location.href = `user-supplier-log-in.html?user-type=${userType}`;
                    }
                })
                .catch(err => console.log(err))
        }
    }

})
