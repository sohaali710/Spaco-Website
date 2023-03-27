// get categories in nav & side nav (in small screens)
let categoriesUl = document.querySelectorAll('.nav-categories')

let lis = ''

fetch('http://linkloop.co:5000/products/categs').then(res => res.json()).then(data => {
    data.data.forEach((categ => {
        lis += `<li><a href="./page-category-products.html?category=${categ.name}">${categ.name}</a></li>`
    }))

    categoriesUl.forEach((ul) => {
        ul.innerHTML = lis
    })
})
