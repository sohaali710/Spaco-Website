
function search(allProducts, allProductsDiv) {
    return (e) => {
        const val = e.target.value;
        console.log(val)
        console.log(allProducts)

        allProducts.forEach((product, index) => {
            const element = allProductsDiv.querySelectorAll('.rental-item')[index]
            console.log(element)

            const isVisible = product.name.includes(val)

            element.classList.toggle('hide', !isVisible)
        })
    }
}

export { search }