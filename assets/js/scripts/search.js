import { getCookie } from "./cookies.js";

function search(allProducts, allProductsDiv) {
    return (e) => {
        const val = e.target.value;
        let element = '';

        let noProductsDiv = document.querySelector('.search-no-products')

        let elementVisibility = allProducts.map((product, index) => {
            if (getCookie('user_access_token') || getCookie('supplier_access_token')) {
                element = allProductsDiv.querySelectorAll('.rental-item')[index]
            } else if (getCookie('admin_access_token')) {
                element = allProductsDiv.querySelectorAll('.product-item')[index]
            }

            const isVisible = product.name.includes(val)
            if (element) element.classList.toggle('hide', !isVisible);

            return isVisible;
        })

        let allInvisible = elementVisibility.every(ele => !ele)

        if (allInvisible) {
            noProductsDiv.classList.remove('hide')
        } else {
            noProductsDiv.classList.add('hide')
        }
    }
}

export { search }