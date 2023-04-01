let categProducts = ''

function getProductsByCateg(productsContainer, selectedCateg) {
    productsContainer.innerHTML = ''

    fetch(`http://linkloop.co:5000/products/product-by-category/${selectedCateg}`)
        .then(res => {
            if (res.status == 200) {
                // console.log(res);
                return res.json();
            }
        })
        .then(data => {
            // console.log(data)
            categProducts = data.data.reverse()

            categProducts.map((product) => {
                let { _id, name, category, description, details, imgs } = product

                let productDiv = ''

                // let lis=''
                // for (let i of details) {
                //     lis += `<li><span>${i.title} : ${i.value}</span></li>`
                // }

                let img = (imgs.length !== 0) ?
                    `<img src="${imgs[0].replace('public', 'http://linkloop.co:5000')}" class="card-img-top rounded-0 product-img" alt="..."></img>`
                    : `<div class="no-img">إضافة صورة للمنتج</div>`;

                productDiv = `
                        <div class="col-12 col-sm-6 col-lg-4 w-auto m-auto m-x-md-0 mt-5">
                            <div class="card text-center p-2 pb-4">
                                <div class="add-product-img" data-bs-toggle="modal" data-bs-target="#exampleModal5" id="updateProdBtn" product-id="${_id}">`
                    + img +
                    `<div class="add-img-text">إضافة | حذف صورة</div>
                                </div>
                                <div class="card-body">
                                    <h4 class="card-title">${name}</h4>
                                    <small style="position:relative;top:-10px;">${category}</small>
                                    <p class="card-text fw-bold">وصف المنتج</p>
                                    <p class="card-text">${description}</p>

                                    <div class="mt-4 d-flex justify-content-around w-100">
                                        <button type="submit" class="btn btn-outline-dark mb-2" data-bs-toggle="modal"
                                            data-bs-target="#exampleModal2" id="updateProdBtn" product-id="${_id}">تعديل
                                            المنتج</button>
                                        <button type="submit" class="btn btn-outline-danger mb-2 ms-3"
                                            data-bs-toggle="modal" data-bs-target="#exampleModal3">حذف
                                            المنتج</button>
                                    </div>
                                </div>
                            </div>
                        </div>`

                productsContainer.innerHTML += productDiv
            })
        })
        .catch(err => console.log(err))
}

export { getProductsByCateg }