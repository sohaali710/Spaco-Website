import { getCookie } from "./cookies.js";

function search(allProducts, allProductsDiv) {
    return (e) => {
        const val = e.target.value;
        let element = '';

        allProducts.forEach((product, index) => {
            if (getCookie('user_access_token') || getCookie('user_access_token')) {
                element = allProductsDiv.querySelectorAll('.rental-item')[index]
            } else if (getCookie('admin_access_token')) {
                element = allProductsDiv.querySelectorAll('.product-item')[index]
            }

            const isVisible = product.name.includes(val)
            element.classList.toggle('hide', !isVisible)
        })
    }
}

export { search }