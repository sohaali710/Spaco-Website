/**change nav in case user is logged in or supplier [in contacts, typography, all products pages] */
import { getCookie } from "./cookies.js";

let navUl = document.querySelector('.uk-navbar-nav')
let sideNavUl = document.querySelector('.uk-nav-default')
let navCartContainer = document.querySelector('.page-header-bottom__right')

let userNav = `
            <li class="uk-active"><a href="index.html">الرئيسية</a></li>
            <li><a href="page-products-list.html">جميع المنتجات</a></li>
            <li><a href="page-categories-1.html">الأقسام<i class="fas fa-angle-down"
                        style="margin-right: 8px;"></i></a>
                <div class="uk-navbar-dropdown">
                    <ul class="uk-nav uk-navbar-dropdown-nav nav-categories">


                    </ul>
                </div>
            </li>
            <li><a href="typography.html">من نحن</a></li>
            <li><a href="page-contacts.html">اتصل بنا</a></li>`

let userSideNav = `
                <li class="uk-active"><a href="index.html">الرئيسية</a></li>
                <li><a href="page-products-list.html">جميع المنتجات</a></li>
                <li class="uk-parent"><a href="page-categories-1.html">الأقسام<i class="fas fa-angle-down"
                            style="margin-right: 8px;"></i></a>
                    <ul class="uk-nav-sub nav-categories">


                    </ul>
                </li>
                <li><a href="typography.html">من نحن</a></li>
                <li><a href="page-contacts.html">اتصل بنا</a></li>`



let supplierNav = `
                <li class="uk-active"><a href="supplier-products.html">متجرك</a></li>
                <li><a href="page-products-list.html">جميع المنتجات</a></li>
                <li><a href="supplier-display-price.html">عروض الأسعار</a></li>
                <li><a href="supplier-accepted-offers.html">طلبات الشراء</a></li>
                <li><a href="typography.html">من نحن</a></li>
                <li><a href="page-contacts.html">اتصل بنا</a></li>`


let cartIcon = `
                <a class="uk-navbar-toggle cart-btn">
                    <div class="cart-btn__icon" id="cart-icon" data-uk-icon="cart">

                    </div>
                </a>`


navUl.innerHTML = userNav
if (getCookie('user_access_token')) {
    navUl.innerHTML = userNav
    sideNavUl.innerHTML = userSideNav
    navCartContainer.innerHTML += cartIcon
} else if (getCookie('supplier_access_token')) {
    navUl.innerHTML = sideNavUl.innerHTML = supplierNav
}

