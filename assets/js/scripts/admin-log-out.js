import { getCookie, deleteCookie } from "./cookies.js";

let logOutBtn = document.getElementById('log-out')

let cookieName = 'admin_access_token'
let redirectTo = 'admin-log-in.html'

logOutBtn.addEventListener('click', event => {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('authorization', `Bearer ${getCookie(cookieName)}`);

    fetch('http://linkloop.co:5000/admin/logout', {
        method: 'GET',
        headers: myHeaders
    })
        .then(res => {
            console.log(res);
            if (res.status == 200) {
                deleteCookie(cookieName)
                location.href = redirectTo;
                return res.json();
            }
        })
        .then(data => console.log(data))
        .catch(err => console.log(err))

})