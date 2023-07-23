import { getCookie } from './cookies.js'

const supplierToken = 'supplier_access_token'

const serverUrl = 'https://space-k8fr.onrender.com'

/** from all products page */
function addToStoreAPI(productId) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('authorization', `Bearer ${getCookie(supplierToken)}`);

    const options = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({ id: productId })
    }

    fetch(`${serverUrl}/supplier/add-prods`, options)
        .then(res => {
            console.log(res);
            if (res.status == 200) {
                return res.json();
            }
        })
        .then(data => {
            console.log(data)
        })
        .catch(err => console.log(err))
}


function addToStore() {
    return (e) => {
        if (e.target.matches("#addToStore")) {
            let productId = e.target.getAttribute('product-id')

            const myHeaders = new Headers();
            myHeaders.append('authorization', `Bearer ${getCookie(supplierToken)}`);

            const options = {
                method: 'GET',
                headers: myHeaders
            }

            fetch(`${serverUrl}/supplier/all-products`, options)
                .then(res => { if (res.status == 200) return res.json() })
                .then(data => {
                    if (data) {
                        const supplierProducts = data.products

                        if (supplierProducts.length !== 0) {
                            console.log(supplierProducts)
                            supplierProducts.forEach((product) => {
                                if (product._id === productId) {
                                    alert('لقد أضفت هذا المنتج إلى متجرك من قبل.')
                                } else {
                                    addToStoreAPI(productId)

                                    let addToStoreBtn = e.target
                                    let addedBtn = e.target.parentElement.children[1]

                                    addedBtn.style.display = 'inline'
                                    addToStoreBtn.style.display = 'none'
                                    setTimeout(() => {
                                        addedBtn.style.display = 'none'
                                        addToStoreBtn.style.display = 'inline'
                                    }, 1500);
                                }
                            })
                        } else {
                            addToStoreAPI(productId)

                            let addToStoreBtn = e.target
                            let addedBtn = e.target.parentElement.children[1]

                            addedBtn.style.display = 'inline'
                            addToStoreBtn.style.display = 'none'
                            setTimeout(() => {
                                addedBtn.style.display = 'none'
                                addToStoreBtn.style.display = 'inline'
                            }, 1500);
                        }
                    }
                })

        }
        if (e.target.matches("#added")) {
            alert('لقد أضفت هذا المنتج إلى متجرك من قبل.')
        }
    }
}
export { addToStore }