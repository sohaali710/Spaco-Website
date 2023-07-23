// in select [admin (add,update product forms) or user search]
import { getCookie } from "./cookies.js"

const serverUrl = 'https://space-k8fr.onrender.com'

function getCategories(categContainer, selectedCateg = '') {
    let options = ''

    fetch(`${serverUrl}/products/categs`).then(res => res.json()).then(data => {
        data.data.forEach((categ => {
            if (categ.name == selectedCateg) {
                options += `<option value="${categ.name}" selected>${categ.name}</option>`
            } else {
                options += `<option value="${categ.name}">${categ.name}</option>`
            }
        }))

        let categoriesDiv = ''

        if (getCookie('admin_access_token')) {
            categoriesDiv = `
                        <div class="custom-form-control">
                            <label for="category" class="my-1">القسم</label>
                            <select class="form-control" name="category" value="${selectedCateg}" id="category">
                                <option value="all-products">كل المنتجات</option>
                                `
                +
                options
                +
                `</select>
                            <small></small>
                        </div>`
        } else {
            categoriesDiv = `<option value="all-products">كل المنتجات</option>` + options
        }

        categContainer.innerHTML = categoriesDiv
    })
}

export { getCategories }