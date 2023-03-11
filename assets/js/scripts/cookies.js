
function setCookie(cookieName) {
    var date = new Date();
    // expired after a month
    date.setMonth(date.getMonth() + 1);

    document.cookie = `${cookieName.name}=${cookieName.value}; expires=${date}`;
}

function getAllCookies() {
    var allCookies = [];
    var keyValCookies = document.cookie.split(";");

    for (var i = 0; i < keyValCookies.length; i++) {
        allCookies[keyValCookies[i].split("=")[0].trim()] = keyValCookies[i].split("=")[1].trim();
    }

    return allCookies;
}

function getCookie(cookieName) {
    var all = getAllCookies();

    for (i in all) {
        if (i == cookieName) {
            return all[i];
        }
    }
}

function deleteCookie(cookieName) {
    var all = getAllCookies();

    for (i in all) {
        if (i == cookieName) {
            document.cookie = `${i}=;expires=1-1-2000`;
        }
    }
}