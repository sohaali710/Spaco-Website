import { getCookie } from './cookies.js'

let supplierToken = 'supplier_access_token'

/** from all products page */
function addToStore(productId) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('authorization', `Bearer ${getCookie(supplierToken)}`);

    const options = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({ id: productId })
    }

    fetch('http://linkloop.co:5000/supplier/add-prods', options)
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

export { addToStore }