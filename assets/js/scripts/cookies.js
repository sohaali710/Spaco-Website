
function setCookie(cookieName, cookieVal) {
    var date = new Date();
    // expired after a month
    date.setMonth(date.getMonth() + 1);

    document.cookie = `${cookieName}=${cookieVal}; expires=${date}`;
}

function getAllCookies() {
    var allCookies = [];
    var keyValCookies = document.cookie.split(";");

    if (keyValCookies[0]) {
        for (var i = 0; i < keyValCookies.length; i++) {
            allCookies[keyValCookies[i].split("=")[0].trim()] = keyValCookies[i].split("=")[1].trim();
        }

        return allCookies;
    }
}

function getCookie(cookieName) {
    var all = getAllCookies();

    for (let i in all) {
        if (i == cookieName) {
            return all[i];
        }
    }
}

function deleteCookie(cookieName) {
    var all = getAllCookies();

    for (let i in all) {
        if (i == cookieName) {
            document.cookie = `${i}=;expires=1-1-2000`;
        }
    }
}

export { setCookie, getCookie, deleteCookie }