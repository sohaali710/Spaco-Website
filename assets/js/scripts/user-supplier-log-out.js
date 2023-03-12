let logOutBtn = document.getElementById('log-out')

logOutBtn.addEventListener('click', event => {
    event.preventDefault();

    fetch('http://localhost:5000/supplier/logout')
        .then(res => {
            if (res.status == 200) {
                console.log(res);
                location.href = 'index.html';
                return res.json();
            }
        })
        .then(data => console.log(data))
        .catch(err => console.log(err))

})
