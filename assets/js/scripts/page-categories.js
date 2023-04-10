// in index(home) & categories-1 pages

const categoriesContainer = document.querySelector('.categories-container')
let categoryItem = ''

fetch('http://linkloop.co:5000/products/categs').then(res => res.json()).then(data => {
    const categories = data.data

    categories.forEach((categ => {
        const { _id, name, img } = categ

        categoriesContainer.innerHTML += `
                        <div class="categ-item">
                            <div class="category-item">
                                <a class="category-item__link uk-inline-clip uk-transition-toggle"
                                    href="page-category-products.html?category=${name}" tabindex="0">
                                    <div class="category-item__media">
                                    <img src="${img.replace('public', 'http://linkloop.co:5000')}" class="card-img-top rounded-0 product-img" alt="..."></img>
                                        <div class="uk-transition-fade">
                                            <div class="uk-overlay-primary uk-position-cover"></div>
                                            <div class="uk-position-center"><span
                                                    data-uk-icon="icon: plus; ratio: 2"></span></div>
                                        </div>
                                    </div>
                                    <div class="category-item__title"> <span>${name}</span></div>
                                </a>
                            </div>
                        </div>`
    }))

    // categoriesContainer.innerHTML += categoryItem
})
