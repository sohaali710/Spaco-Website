// const emailRegex = /^(?=[^@]{4,}@)([\w\.-]*[a-zA-Z0-9_]@(?=.{4,}\.[^.]*$)[\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z])$/;
const emailRegex = /^[a-z0-9]+[.]?[a-z0-9]+@metu\.edu$/;
const passwordRegex = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/;

let checkUsername = (nameInput) => {
    if (nameInput.value === '') {
        setErrorFor(nameInput, 'من فضلك ادخل اسمك  .')
    } else {
        setSuccessFor(nameInput)
    }
}

let checkEmail = (emailInput) => {
    if (emailInput.value === '') {
        setErrorFor(emailInput, 'من فضلك ادخل عنوان بريدك الإلكتروني.')
    } else if (emailRegex.test(emailInput.value)) {
        setErrorFor(emailInput, 'البريد الإلكتروني يجب أن يحتوي على علامة @ و حرفين بعدها على الأقل.')
    } else {
        setSuccessFor(emailInput)
    }

}

let checkPassword = (passwordInput) => {
    if (passwordInput.value === '') {
        setErrorFor(passwordInput, 'من فضلك ادخل كلمة المرور.')
    } else if (passwordRegex.test(passwordInput.value)) {
        setErrorFor(passwordInput, 'كلمة المرور يجب ألا تقل عن 8 أحرف و تحتوي على الأقل على حرف إنجليزي كبير و حرف صغير و رقم و رمز .')
    } else {
        setSuccessFor(passwordInput)
    }
}

let checkConfirmPass = (passwordInput, confirmPassInput) => {
    if (confirmPassInput.value === '') {
        setErrorFor(confirmPassInput, 'من فضلك اعد ادخال كلمة المرور.')
    } else if (confirmPassInput.value !== passwordInput.value) {
        setErrorFor(confirmPassInput, 'كلمة المرور غير متطابقة. من فضلك اعد ادخالها مرة أخرى.')
    } else {
        setSuccessFor(confirmPassInput)
    }
}

let checkMobile = (mobileInput) => {
    if (mobileInput.value === '') {
        setErrorFor(mobileInput, 'من فضلك ادخل رقم الجوال.')
    } else {
        setSuccessFor(mobileInput)
    }
}

let checkTaxes = (taxrecordInput) => {
    if (taxrecordInput.value === '') {
        setErrorFor(taxrecordInput, 'من فضلك ادخل السجل الضريبي .')
    } else {
        setSuccessFor(taxrecordInput)
    }
}

let removeCheckTaxes = (taxrecordInput) => {
    const formControl = taxrecordInput.parentElement
    const small = formControl.querySelector('small')

    small.innerText = ''

    formControl.className = "custom-form-control"
}

let checkAddress = (addressInput) => {
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


let setFormError = (formElement, emailInput, passwordInput, msg) => {
    if (emailInput.parentElement.classList.contains('success') && passwordInput.parentElement.classList.contains('success')) {
        const formErrorMsg = formElement.querySelector('.formErrorMsg')
        formErrorMsg.innerText = msg

        formElement.className = "error"

        emailInput.parentElement.className = "custom-form-control error"
        passwordInput.parentElement.className = "custom-form-control error"
        emailInput.parentElement.querySelector('small').innerHTML = ''
        passwordInput.parentElement.querySelector('small').innerHTML = ''

    }
}

let deleteFormError = (formElement) => {
    formElement.querySelector('.formErrorMsg').innerHTML = ''
}


/**add & update product form*/
let checkName = (nameInput) => {
    if (nameInput.value === '') {
        setErrorFor(nameInput, 'ادخل اسم المنتج .')
    } else {
        setSuccessFor(nameInput)
    }
}
let checkCategory = (categoryInput) => {
    if (categoryInput.value === '') {
        setErrorFor(categoryInput, 'ادخل القسم الخاص بالمنتج .')
    } else {
        setSuccessFor(categoryInput)
    }
}
let checkDescription = (descriptionInput) => {
    if (descriptionInput.value === '') {
        setErrorFor(descriptionInput, 'ادخل وصف المنتج .')
    } else {
        setSuccessFor(descriptionInput)
    }
}
let checkDetails = (detailsInput) => {
    if (detailsInput.value === '') {
        setErrorFor(detailsInput, 'ادخل وصف المنتج .')
    } else {
        setSuccessFor(detailsInput)
    }
}
let checkImgs = (imgsInput) => {
    if (imgsInput.value === '') {
        setErrorFor(imgsInput, 'ادخل صور المنتج .')
    } else {
        setSuccessFor(imgsInput)
    }
}


export {
    checkUsername, checkEmail, checkPassword, checkConfirmPass, checkMobile, checkAddress, checkTaxes, setFormError, deleteFormError, removeCheckTaxes,
    checkName, checkCategory, checkDescription, checkDetails, checkImgs
}