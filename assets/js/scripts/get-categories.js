function getCategories(categContainer, selectedCateg = '') {
    let options = ''

    fetch('http://linkloop.co:5000/products/categs').then(res => res.json()).then(data => {
        data.data.forEach((categ => {
            if (categ.name == selectedCateg) {
                options += `<option value="${categ.name}" selected>${categ.name}</option>`
            } else {
                options += `<option value="${categ.name}">${categ.name}</option>`
            }
            console.log(options)
        }))

        let categoriesDiv = `
                    <div class="custom-form-control">
                        <label for="category" class="my-1">القسم</label>
                        <select class="form-control" name="category" value="${selectedCateg}" id="category">
                            <option value="">اختر القسم</option>
                            `
            +
            options
            +
            `</select>
                        <small></small>
                    </div>`

        categContainer.innerHTML = categoriesDiv
    })
}

export { getCategories }