let allProductsDiv = document.querySelector('.all-products')
let allProducts = []

let moreDetailsBtn = document.getElementById('more-details')


fetch('http://localhost:5000/products/all')
    .then(res => {
        if (res.status == 200) {
            // console.log(res);
            // location.href = 'products-CRUD.html';
            return res.json();
        }
    })
    .then(data => {
        // console.log(data)
        allProducts = data.data
        console.log(allProducts)


        allProducts.map((product) => {
            let lis = ''

            for (let i of product.details) {
                // console.log(i)
                lis += `<li>${i.title} : ${i.value}</li>`
            }

            allProductsDiv.innerHTML += `<div class="rental-item">
                <div class="rental-item__media"> <img src="./assets/img/rental-item-1.jpg" alt="Standard Excavator"></div>
                <div class="rental-item__desc" dir="rtl">
                    <div class="rental-item__title">${product.name}</div>
                    <div class="rental-item__price-delivery"> <span>تفاصيل المنتج</span></div>
                    <div class="rental-item__specifications">
                        <ul class="uk-list uk-list-disc uk-column-1-1@s uk-column-1-2@s">`
                + lis +
                `</ul>
                    </div>
        
                    <div class="rental-item__price" dir="rtl">
                        <button class="uk-button uk-button-large uk-width-1-1" type="submit"><span>اضف إلى
                            السلة</span><img src="./assets/img/icons/cart-shopping-solid.svg" alt=""
                            style="margin-right: 10px;"></button>
                        <a onclick="moreDetails(product._id)" class="uk-button uk-button-large uk-button-secondary"
                        type="submit" id="more-details"><span>عرض تفاصيل
                            أكثر</span></a>
                    </div>
                </div>
            </div>`
        })
    })
    .catch(err => console.log(err))


/**products-details */
function moreDetails(id) {
    // console.log(event.target.parentElement.parentElement.parentElement.parentElement)
    console.log(id)
}