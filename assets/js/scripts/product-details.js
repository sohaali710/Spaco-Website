import { addToCart } from './add-to-cart.js'
let productDetailsContainer = document.querySelector('.product-details')

const selectedProdId = location.search.split("=")[1];

fetch(`http://linkloop.co:5000/products/product-by-id/${selectedProdId}`).then(res => res.json()).then(data => {
    console.log(data);
    let { name, category, description, details, imgs, _id } = data.data


    let imagesSlider = '';
    let imagesSliderSmall = ''
    if (!imgs.length) { imagesSlider = `<li><div class="no-img">لم يتم إضافة صورة لهذا المنتج</div></li>`; }

    imgs.forEach((img, index) => {
        img = img.replace('public', 'http://linkloop.co:5000')

        imagesSlider += `
                        <li><a href="${img}">
                        <img class="uk-width-1-1" src="${img}" alt="img-gallery" data-uk-cover>
                        </a></li>
                        `

        imagesSliderSmall += `
                                    <li data-uk-slideshow-item="${index}"><a href="#">
                                    <img src="${img}" alt="img-gallery">
                                    </a></li>
                                    `
    })

    let detailsRow = ''
    details.forEach((d) => {
        detailsRow += `
                <tr>
                    <td>${d.title}</td>
                    <td>${d.value}</td>
                </tr>
                `
    })


    productDetailsContainer.innerHTML = `
            <div class="uk-grid" data-uk-grid>
                        <div class="uk-width-2-3@m">
                            <div class="equipment-detail">
                                <div class="equipment-detail__gallery">
                                    <div data-uk-slideshow="min-height: 300; max-height: 430">
                                        <div class="uk-position-relative">
                                            <ul class="uk-slideshow-items uk-child-width-1-1"
                                                data-uk-lightbox="animation: scale">`
        +
        imagesSlider
        +

        `</ul><a class="uk-position-center-left uk-position-small uk-hidden-hover"
                                                href="#" data-uk-slidenav-previous
                                                data-uk-slideshow-item="previous"></a><a
                                                class="uk-position-center-right uk-position-small uk-hidden-hover"
                                                href="#" data-uk-slidenav-next data-uk-slideshow-item="next"></a>
                                        </div>
                                        <div class="uk-margin-top" data-uk-slider>
                                            <ul
                                                class="uk-thumbnav uk-slider-items uk-grid uk-grid-small uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-5@l">
                                                `
        +
        imagesSliderSmall
        +
        `</ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="uk-width-1-3@m" dir="rtl">
                            <div class="equipment-order-total">
                                <div class="equipment-detail__title">${name}</div>
                                <div class="equipment-detail__location">${category}</div>

                                <button class="uk-button uk-button-large uk-width-1-1" type="button" id="addToCart">
                                    اضف إلى السلة<img src="./assets/img/icons/cart-shopping-solid.svg" alt="cart-icon">
                                </button>
                                <div class="add-product-quantity">
                                    <button class="uk-button uk-button-large uk-width-1-1" type="submit" id="addQuantity" product-id="${_id}">اضف</button>
                                    <input type="number" class="quantity-input" min="1" value="1">
                                </div>

                                <div class="equipment-detail__btns">
                                    <a href="#!"><i class="fas fa-star"></i>اضف إلى المفضلة</a>
                                </div>
                            </div>
                        </div>
                        <div class="uk-width-3-3@m  uk-width-expand" dir="rtl">
                            <div class="equipment-detail__desc">
                                <div class="section-title">
                                    <div class="uk-h2">وصف المنتج</div>
                                </div>
                                <p>${description}</p>
                            </div>
                            <div class="equipment-detail__specification">
                                <div class="section-title">
                                    <div class="uk-h2">تفاصيل أكثر عن المنتج</div>
                                </div>
                                <table class="uk-table uk-table-striped">
                                    <div class="tbody">`
        +
        detailsRow
        +
        `</div>
                                </table>
                            </div>
                        </div>
                    </div>
            `
});


/** add-to-cart input + cart-icon-count */
let cartIconCount = document.querySelector('.cart-btn__icon')

productDetailsContainer.addEventListener('click', addToCart(cartIconCount))