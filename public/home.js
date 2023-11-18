

    document.getElementById('loginForm').addEventListener('submit', async function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        let loginId = document.getElementById('login_id').value;
        let pass = document.getElementById('password').value;
        let raw = JSON.stringify({
            login_id: loginId,
            password: pass
        })

        var requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: raw,
            redirect: 'follow'
        }
        const accessToken = await fetch('/getAccessToken', requestOptions)
        .catch(error => console.log({error}));
    
        if(accessToken) {
            await fetch('/allCustomers')
            .then(res => {
                if(res.ok){
                    window.location.href = '/allCustomers';
                }
            })
            .catch(error => console.log({error}));
        }
    });
