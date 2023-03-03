const formElement = document.getElementById('log-in-form');

let flag = false;

formElement.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(formElement);

    const data = Object.fromEntries(formData)
    console.log(data)

    if (flag) {
        fetch('https://reqres.in/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.status == 200) {
                    console.log(res);
                    location.href = 'index.html';
                    return res.json();
                } else {
                    alert('user name or password are wrong, try again')
                }
            })
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }

})