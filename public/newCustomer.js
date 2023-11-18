
document.getElementById('newCustomerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    let first_name = document.getElementById('first_name').value;
    let last_name = document.getElementById('last_name').value;
    let street = document.getElementById('street').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let state = document.getElementById('state').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;

    let raw = JSON.stringify({
        first_name,
        last_name,
        street,
        address,
        city,
        state,
        email,
        phone
    });
    var requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: raw,
        redirect: 'follow'
    }
    const status = await fetch('/addCustomer', requestOptions)
    .catch(error => console.log({error}));
    if(status) {
        await fetch('/allCustomers')
        .then(res => {
            if(res.ok){
                window.location.href = '/allCustomers';
            }
        })
        .catch(error => console.log({error}));
    }
})