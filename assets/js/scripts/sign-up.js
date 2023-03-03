const formElement = document.getElementById('sign-up-form');

formElement.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(formElement);

    const data = Object.fromEntries(formData)

    fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.status == 200) {
                console.log(res);
                window.location.href = 'index.html';
                return res.json();
            } else {
                alert('user name or password are wrong, try again')
            }
        })
        .then(data => console.log(data))
        .catch(err => console.log(err))

})